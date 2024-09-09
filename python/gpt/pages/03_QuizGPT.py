import json
from langchain.document_loaders import UnstructuredFileLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain.chat_models import ChatOpenAI
from langchain.retrievers import WikipediaRetriever
from langchain.prompts import ChatPromptTemplate
from langchain.callbacks import StreamingStdOutCallbackHandler
from langchain.schema import BaseOutputParser, output_parser
import streamlit as st

import os

class JsonOutputParser(BaseOutputParser):
    def parse(self, text):
        text = text.replace("```", "").replace("json", "")
        return json.loads(text)


output_parser = JsonOutputParser()

st.set_page_config(
    page_title="QuizGPT",
    page_icon="❓",
)

st.title("QuizGPT")

llm = ChatOpenAI(
    temperature=0.1,
    model="gpt-4-turbo",
    streaming=True,
    callbacks=[StreamingStdOutCallbackHandler()],
)


def format_docs(docs):
    return "\n\n".join(document.page_content for document in docs)

questions_prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            """
    당신은 프론트엔드 개발을 가르치는 선생님 역할을 맡고 있습니다.
    
    주어진 context를 바탕으로 사용자의 지식을 테스트할 수 있는 최소 10개의 질문을 만들어주세요. 
    
    각 질문에는 4개의 답변이 있어야 하며, 그 중 하나만 정답이고 나머지는 오답이어야 합니다.
    질문에 대한 답변인 이유에 대해서도 함께 설명해주어야합니다.
    
    (정답)을 표시하려면 (o)를 사용하세요.
    
    질문 예시:
    
    질문: HTML의 주 목적은 무엇인가요?
    답변: 웹페이지 스타일 적용|웹페이지 구조 정의(o)|데이터베이스 관리|사용자 인터랙션 처리
    설명: HTML은 웹페이지의 구조를 정의하는 언어입니다. CSS는 스타일을 적용하고, 자바스크립트는 상호작용을 처리하는 역할을 합니다.
    
    질문: CSS는 무엇의 약자인가요?
    답변: 캐스캐이딩 스타일 시트(o)|컬러 스타일 시스템|코드 스타일 문법|중앙 스타일 시트
    설명: CSS는 'Cascading Style Sheets'의 약자로, 웹 페이지의 디자인과 레이아웃을 제어하는 데 사용됩니다.
    
    질문: 자바스크립트는 웹 개발에서 어떤 역할을 하나요?
    답변: 정적 웹페이지 생성|웹페이지에 상호작용 추가(o)|웹페이지 스타일 적용|서버 요청 관리
    설명: 자바스크립트는 웹페이지에 동적인 기능을 추가하여 사용자와의 상호작용을 가능하게 합니다. 정적 웹페이지는 HTML과 CSS로만 구현됩니다.
    
    질문: 웹 개발에서 DOM이란 무엇인가요?
    답변: 문서 객체 모델(o)|데이터 객체 관리|동적 객체 모델|문서 방향 모델
    설명: DOM은 'Document Object Model'의 약자로, 웹페이지의 구조화된 표현을 의미하며, 자바스크립트가 이를 이용해 동적으로 웹 페이지를 조작할 수 있습니다.
    
    질문: 다음 중 자바스크립트 프레임워크는 무엇인가요?
    답변: 플라스크|리액트(o)|장고|라라벨
    설명: 리액트(React)는 자바스크립트 기반의 프론트엔드 라이브러리로, 사용자 인터페이스를 효율적으로 구축하기 위해 사용됩니다. 플라스크와 장고는 파이썬 기반의 백엔드 프레임워크입니다.
    
    이제 당신의 차례입니다! context를 기반으로 질문을 만들어주세요.
    
    context: {context}
""",
        )
    ]
)

questions_chain = {"context" : format_docs} | questions_prompt | llm


formatting_prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            """
    당신은 강력한 포맷팅 알고리즘입니다.
    
    당신은 시험 문제를 JSON 형식으로 포맷합니다.
    (o)는 정답을 의미합니다.
    
    입력 예시:

    질문: HTML의 주 목적은 무엇인가요?
    답변: 웹페이지 스타일 적용|웹페이지 구조 정의(o)|데이터베이스 관리|사용자 인터랙션 처리
         
    질문: CSS는 무엇의 약자인가요?
    답변: 캐스캐이딩 스타일 시트(o)|컬러 스타일 시스템|코드 스타일 문법|중앙 스타일 시트
         
    질문: 자바스크립트는 웹 개발에서 어떤 역할을 하나요?
    답변: 정적 웹페이지 생성|웹페이지에 상호작용 추가(o)|웹페이지 스타일 적용|서버 요청 관리
    
    출력 예시:
     
    ```json
    {{
        "questions": [
            {{
                "question": "HTML의 주 목적은 무엇인가요?",
                "answers": [
                    {{
                        "answer": "웹페이지 스타일 적용",
                        "correct": false
                    }},
                    {{
                        "answer": "웹페이지 구조 정의",
                        "correct": true
                    }},
                    {{
                        "answer": "데이터베이스 관리",
                        "correct": false
                    }},
                    {{
                        "answer": "사용자 인터랙션 처리",
                        "correct": false
                    }}
                ]
            }},
            {{
                "question": "CSS는 무엇의 약자인가요?",
                "answers": [
                    {{
                        "answer": "캐스캐이딩 스타일 시트",
                        "correct": true
                    }},
                    {{
                        "answer": "컬러 스타일 시스템",
                        "correct": false
                    }},
                    {{
                        "answer": "코드 스타일 문법",
                        "correct": false
                    }},
                    {{
                        "answer": "중앙 스타일 시트",
                        "correct": false
                    }}
                ]
            }},
            {{
                "question": "자바스크립트는 웹 개발에서 어떤 역할을 하나요?",
                "answers": [
                    {{
                        "answer": "정적 웹페이지 생성",
                        "correct": false
                    }},
                    {{
                        "answer": "웹페이지에 상호작용 추가",
                        "correct": true
                    }},
                    {{
                        "answer": "웹페이지 스타일 적용",
                        "correct": false
                    }},
                    {{
                        "answer": "서버 요청 관리",
                        "correct": false
                    }}
                ]
            }}
        ]
    }}
    ```

    이제 당신의 차례입니다!

    Questions: {context}
""",
        )
    ]
)

formatting_chain = formatting_prompt | llm

@st.cache_data(show_spinner="Loading file...")
def split_file(file):
    file_content = file.read()

    file_dir = "./.cache/quiz_files"
    os.makedirs(file_dir, exist_ok=True) 

    file_path = f"./.cache/quiz_files/{file.name}"
    with open(file_path, "wb") as f:
        f.write(file_content)
    splitter = CharacterTextSplitter.from_tiktoken_encoder(
        separator="\n",
        chunk_size=600,
        chunk_overlap=100,
    )
    loader = UnstructuredFileLoader(file_path)
    docs = loader.load_and_split(text_splitter=splitter)
    return docs

@st.cache_data(show_spinner="Making quiz...")
def run_quiz_chain(_docs, topic):
    chain = {"context": questions_chain} | formatting_chain | output_parser
    return chain.invoke(_docs)

@st.cache_data(show_spinner="Searching Wikipedia...")
def wiki_search(term):
    retriever = WikipediaRetriever(top_k_results=5)
    docs = retriever.get_relevant_documents(term)
    return docs

with st.sidebar:
    docs = None
    topic = None
    choice = st.selectbox(
        "Choose what you want to use.",
        (
            "File",
            "Wikipedia Article",
        ),
    )
    if choice == "File":
        file = st.file_uploader(
            "Upload a .docx , .txt or .pdf file",
            type=["pdf", "txt", "docx"],
        )
        if file:
            docs = split_file(file)
    else:
        topic = st.text_input("Search Wikipedia...")
        if topic:
            docs = wiki_search(topic)

if not docs:
    st.markdown(
        """
    QuizGPT에 어서 오세요.
                
    저는 여러분의 지식을 테스트하고 공부하는 데 도움이 되도록 여러분이 업로드한 파일이나 위키피디아 아티클을 바탕으로 퀴즈를 만들 것입니다.

    파일을 업로드 하거나 사이드바에서 위키피디아에 검색하여 시작해주세요.
                
    """
    )
else:
    response = run_quiz_chain(docs, topic if topic else file.name)
    with st.form("questions_form"):
        for question in response["questions"]:
            st.write(question["question"])
            value = st.radio(
                "Select an option.",
                [answer["answer"] for answer in question["answers"]],
                index=None,
            )
            if {"answer": value, "correct": True} in question["answers"]:
                st.success("Correct!")
                st.info(question["description"])
            elif value is not None:
                st.error("Wrong!")
        button = st.form_submit_button()
