from langchain.document_loaders import SitemapLoader
from langchain.schema.runnable import RunnableLambda, RunnablePassthrough
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores.faiss import FAISS
from langchain.embeddings import OpenAIEmbeddings
from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
import streamlit as st


llm = ChatOpenAI(
    temperature=0.1,
)

answers_prompt = ChatPromptTemplate.from_template(
    """
    주어진 context만을 사용하여 사용자의 질문에 답변하세요. 답변할 수 없는 경우, '모른다'고 말하고 절대 추측하지 마세요.
                                                  
    그런 다음 답변에 0점에서 5점 사이의 점수를 부여하세요. 답변이 사용자의 질문을 정확히 답하면 점수가 높아야 하고, 그렇지 않으면 낮아야 합니다.
    점수가 0점일지라도 항상 점수를 포함해야 합니다.
    Context: {context}
                                                  
    예시:
                                                  
    질문: 달까지의 거리는 얼마나 되나요?
    답변: 달은 384,400km 떨어져 있습니다.
    점수: 5
                                                  
    질문: 태양까지의 거리는 얼마나 되나요?
    답변: 잘 모르겠습니다.
    점수: 0
                                                  
    이제 당신의 차례입니다!
    질문: {question}
    """
)



def get_answers(inputs):
    docs = inputs["docs"]
    question = inputs["question"]
    answers_chain = answers_prompt | llm
    return {
        "question": question,
        "answers": [
            {
                "answer": answers_chain.invoke(
                    {"question": question, "context": doc.page_content}
                ).content,
                "source": doc.metadata["source"],
                "date": doc.metadata["lastmod"],
            }
            for doc in docs
        ],
    }

choose_prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            """
            사용자 질문에 대답하기 위해 반드시 아래의 미리 제공된 답변만을 사용하세요.
            가장 점수가 높은 (더 유용한) 답변을 사용하고, 최신 답변을 우선적으로 선택하세요.
            출처를 반드시 인용하고, 답변에 포함된 출처는 변경하지 말고 그대로 반환하세요.
            답변들: {answers}
            """,
        ),
        ("human", "{question}"),
    ]
)



def choose_answer(inputs):
    answers = inputs["answers"]
    question = inputs["question"]
    choose_chain = choose_prompt | llm
    condensed = "\n\n".join(
        f"{answer['answer']}\nSource:{answer['source']}\nDate:{answer['date']}\n"
        for answer in answers
    )
    return choose_chain.invoke(
        {
            "question": question,
            "answers": condensed,
        }
    )

def parse_page(soup):
    header = soup.find("header")
    footer = soup.find("footer")
    if header:
        header.decompose()
    if footer:
        footer.decompose()
    return (
        str(soup.get_text())
        .replace("\n", " ")
        .replace("\xa0", " ")
    )

@st.cache_data(show_spinner="Loading website...")
def load_website(url):
    splitter = RecursiveCharacterTextSplitter.from_tiktoken_encoder(
        chunk_size=1000,
        chunk_overlap=200,
    )
    loader = SitemapLoader(
        url,
        filter_urls=[
            r"^(.*\/ai-gateway  \/).*",
            r"^(.*\/vectorize\/).*",
            r"^(.*\/workers-ai\/).*",
        ],
        parsing_function=parse_page,
    )
    loader.requests_per_second = 2
    docs = loader.load_and_split(text_splitter=splitter)
    vector_store = FAISS.from_documents(docs, OpenAIEmbeddings())
    return vector_store.as_retriever()

st.set_page_config(
    page_title="SiteGPT",
    page_icon="🖥️",
)


st.markdown(
    """
    # SiteGPT
            
    Ask questions about the content of a website.
            
    Start by writing the URL of the website on the sidebar.
"""
)


with st.sidebar:
    url = st.text_input(
        "Write down a URL",
        placeholder="https://example.com",
    )


if url:
    if ".xml" not in url:
        with st.sidebar:
            st.error("Sitemap URL을 입력해주세요.")
    else:
        retriever = load_website(url)
        query = st.text_input("웹사이트에 대해 질문해주세요.")
        if query:
            chain = (
                {
                    "docs": retriever,
                    "question": RunnablePassthrough(),
                }
                | RunnableLambda(get_answers)
                | RunnableLambda(choose_answer)
            )
            result = chain.invoke(query)
            st.markdown(result.content.replace("$", "\$"))