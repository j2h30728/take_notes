from langchain.prompts import ChatPromptTemplate
from langchain.document_loaders import UnstructuredFileLoader
from langchain.embeddings import CacheBackedEmbeddings, OpenAIEmbeddings
from langchain.schema.runnable import RunnableLambda, RunnablePassthrough
from langchain.storage import LocalFileStore
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores.faiss import FAISS
from langchain.chat_models import ChatOpenAI
from langchain.callbacks.base import BaseCallbackHandler
import streamlit as st

# Streamlit 앱 설정 (페이지 제목, 아이콘 설정)
st.set_page_config(
    page_title="DocumentGPT",
    page_icon="📃",
)

# Callback handler 클래스 정의: AI 응답이 실시간으로 표시되도록 핸들링
class ChatCallbackHandler(BaseCallbackHandler):
    message = ""  # 메시지 초기화

    def on_llm_start(self, *args, **kwargs):
        # 새로운 메시지 박스를 생성하여 비워둠
        self.message_box = st.empty()

    def on_llm_end(self, *args, **kwargs):
        # AI 응답 완료 시 메시지를 저장
        save_message(self.message, "ai")

    def on_llm_new_token(self, token, *args, **kwargs):
        # 새로운 토큰이 생성될 때마다 메시지에 추가하고 화면에 표시
        self.message += token
        self.message_box.markdown(self.message)

# OpenAI의 LLM(언어 모델) 생성, 스트리밍 기능과 핸들러 등록
llm = ChatOpenAI(
    temperature=0.1,
    streaming=True,  # 실시간 스트리밍 응답
    callbacks=[
        ChatCallbackHandler(),  # 위에서 정의한 핸들러
    ],
)

# 파일을 임베딩하고 벡터화하는 함수
@st.cache_data(show_spinner="Embedding file...")
def embed_file(file):
    file_content = file.read()  # 파일 내용을 읽음
    file_path = f"./.cache/files/{file.name}"  # 파일 경로 설정
    with open(file_path, "wb") as f:
        f.write(file_content)  # 파일을 지정된 경로에 저장

    # 텍스트 분할 설정 (텍스트를 작은 청크로 나눔)
    splitter = CharacterTextSplitter.from_tiktoken_encoder(
        separator="\n",
        chunk_size=600,
        chunk_overlap=100,
    )

    # 파일을 로드하고 분할
    loader = UnstructuredFileLoader(file_path)
    docs = loader.load_and_split(text_splitter=splitter)

    # 캐시 디렉토리 설정
    cache_dir = LocalFileStore(f"./.cache/embeddings/{file.name}")
    
    # 임베딩 및 캐시 설정
    embeddings = OpenAIEmbeddings()
    cached_embeddings = CacheBackedEmbeddings.from_bytes_store(embeddings, cache_dir)

    # 벡터 저장소 생성 (검색 가능하도록)
    vectorstore = FAISS.from_documents(docs, cached_embeddings)

    # 검색기 생성 및 반환
    retriever = vectorstore.as_retriever()
    return retriever

# 채팅 메시지 저장 함수
def save_message(message, role):
    st.session_state["messages"].append({"message": message, "role": role})

# 채팅 메시지를 UI에 표시하는 함수
def send_message(message, role, save=True):
    with st.chat_message(role):  # Streamlit에서 채팅 메시지 박스를 생성
        st.markdown(message)  # 메시지 내용을 마크다운 형식으로 표시
    if save:
        save_message(message, role)  # 세션 상태에 메시지 저장

# 이전 메시지 이력을 UI에 다시 그리는 함수
def paint_history():
    for message in st.session_state["messages"]:
        send_message(
            message["message"],
            message["role"],
            save=False,  # 이미 저장된 메시지는 다시 저장하지 않음
        )

# 문서 내용을 포맷하는 함수 (텍스트로 변환)
def format_docs(docs):
    return "\n\n".join(document.page_content for document in docs)

# 대화용 프롬프트 템플릿 설정
prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            """
            Answer the question using ONLY the following context. If you don't know the answer just say you don't know. DON'T make anything up.

            Context: {context}
            """,
        ),
        ("human", "{question}"),
    ]
)

# Streamlit 앱의 UI 설정
st.title("DocumentGPT")

st.markdown(
    """
Welcome!

Use this chatbot to ask questions to an AI about your files!

Upload your files on the sidebar.
"""
)

# 사이드바에서 파일 업로드 UI
with st.sidebar:
    file = st.file_uploader(
        "Upload a .txt .pdf or .docx file",
        type=["pdf", "txt", "docx"],
    )

# 파일이 업로드된 경우
if file:
    retriever = embed_file(file)  # 파일 임베딩 후 검색기 생성
    send_message("I'm ready! Ask away!", "ai", save=False)  # 준비 완료 메시지 표시
    paint_history()  # 기존 메시지 이력 표시

    message = st.chat_input("Ask anything about your file...")  # 사용자 입력 받음
    if message:
        send_message(message, "human")  # 사용자가 입력한 메시지 표시
        chain = (
            {
                "context": retriever | RunnableLambda(format_docs),  # 검색 결과 포맷팅
                "question": RunnablePassthrough(),  # 사용자 질문 그대로 전달
            }
            | prompt  # 질문에 맞는 프롬프트 생성
            | llm  # 언어 모델을 사용해 응답 생성
        )
        with st.chat_message("ai"):  # AI 응답 박스 생성
            chain.invoke(message)  # 언어 모델 실행 및 응답 표시

# 파일이 없을 경우 메시지 초기화
else:
    st.session_state["messages"] = []

