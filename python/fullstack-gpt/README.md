# FULLSTACK-GPT

## 2 INTRODUCE

### 2.0 Welcome (02:06)

### 2.1 Requirements (02:47)

### 2.2 What Are We Using (04:55)

### 2.3 OpenAI Requirements (03:18)

### 2.4 Disclaimer (02:33)

### 2.5 [Virtual Environment](https://docs.python.org/ko/3/library/venv.html) (11:03)

#### [가상환경 만들기](https://docs.python.org/ko/3/library/venv.html#how-venvs-work)

1. 가상환경 생성

```bash
$ python -m venv <venv>

# python3 -m venv env
```

2. 가상환경 활성화

```bash
# mac OS기준
$ source <venv>/bin/activate

# source env/bin/activate
```

3. 패키지 추가 및 설치

- requirements.txt 추가

```bash
$ pip3 install -r requirements
```

4. 가상환경 확인

```py
import tiktoken

print(tiktoken)

#❯ python main.py

```

#### 인터프리터 인식 하지 못할때 수동으로 지정하기

1. 가상환경의 Python 경로 확인: 먼저, 터미널에서 현재 가상환경의 Python 실행 파일 경로를 확인

```bash
which python
# > 가상환경의 python 실행 파일 경로를 출력함
```

2. VSCode에서 인터프리터 선택:
   - VSCode에서 Ctrl+Shift+P (macOS에서는 Cmd+Shift+P)를 눌러 명령 팔레트를 엽니다.
   - "Python: Select Interpreter"를 선택합니다.
   - 표시되는 목록 하단에 "Enter interpreter path..."를 선택합니다.
   - 가상환경의 Python 경로를 입력합니다.

### 2.6 Jupyter Notebooks (05:26)

1. `.ipynb` 확장자 파일

# 3 Welcome To Langchain

## 3.0 LLMs and Chat Models (08:07)

- 환경변수를 읽지 못해서 직접 dotenv와 os를 불러서 진행한다.

```py
from dotenv import load_dotenv
import os
from langchain.chat_models import ChatOpenAI

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")


chat = ChatOpenAI(openai_api_key=api_key)


b = chat.predict("전 세계에서 나라가 몇개야?")

b
```

- '2021년 현재 전 세계에는 195개의 나라가 있습니다. 이 숫자는 유엔에 회원국으로 등록된 나라들을 기준으로 한 것이며, 이외에도 일부 비인정국가나 지역이 존재합니다.'

## 3.1 Predict Messages (05:04)

## 3.2 Prompt Templates (07:59)

### 프롬프트 문장

- ` PromptTemplate.from_template("프롬프트 내용 {format 함수로 채워 줄 변수}")` : 템플릿 생성
- `template.format(format 함수로 채워 줄 변수="실제 넣어줄 값")`: 원하는 값을 템플리에 넣어서 프롬프트를 완성시킴
- `chat.predict(prompt)` : 프롬프트 실행

```py
from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
import os

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")


chat = ChatOpenAI(openai_api_key=api_key, temperature=0.1)


template = PromptTemplate.from_template(
    "{country_a} 와 {country_b}의 거리가 어떻게 돼?",
)

prompt = template.format(country_a="멕시코", country_b="태국")


chat.predict(prompt)
```

### 프롬프트 대화

- `ChatPromptTemplate.from_messages` : 간소화된 프롬프트 대화 템플릿 생성 가능
  - 'system', 'ai', 'human' 의 대화주체를 정하고 컨텐츠를 튜플에 넣어서 리스트로 만든다.
- `template.format_messages` : 생성한 템플릿을 포맷팅한다.

```py
from langchain.prompts import  ChatPromptTemplate

template = ChatPromptTemplate.from_messages(
    [
        ("system", "당신은 지리학자 입니다. 오직 {language}로 대답해야합니다."),
        ("ai", "안녕하세요. 제 이름은 {name}입니다!"),
        (
            "human",
            "{country_a}와 {country_b}의 거리가 어떻게 되나요? 그리고 당신의 이름은 무엇인가요?",
        ),
    ]
)

prompt = template.format_messages(
    language="한국어",
    name="홍길동",
    country_a="멕시코",
    country_b="태국",
)


chat.predict_messages(prompt)
```

## 3.3 OutputParser and [LCEL](https://python.langchain.com/v0.1/docs/expression_language/) (11:51)

- `chain = template | chat | CommaOutputParser()`
  - template 실행 => cath 실행 => CommaOutputParser() 실행한 값을 반환

### [invoke](https://python.langchain.com/v0.1/docs/expression_language/why/#invoke)

가장 간단한 경우, 토픽 문자열을 전달하고 joke 문자열을 반환하려고 합니다:

### [Runnable interface](https://python.langchain.com/v0.1/docs/expression_language/interface/)

<img width='500' src='./docs/lcel.png' alt='Runnable interface'/>

## 3.4 [Chaining Chains](https://python.langchain.com/v0.1/docs/expression_language/why/#invoke) (14:11)

1. `chef_prompt | chat`: `chef_prompt`를 사용하여 프롬프트를 생성하고, 이를 `chat`으로 전달하여 AI로부터 메시지를 받습니다. 이 결과가 `chef_chain`입니다.

2. `veg_chef_prompt | chat`: `veg_chef_prompt`를 사용하여 또 다른 프롬프트를 생성하고, 이를 `chat`으로 전달하여 AI로부터 메시지를 받습니다. 이 결과가 `veg_chain`입니다.

3. `{"recipe": chef_chain} | veg_chain`: `chef_chain`의 결과를 `recipe` 변수로 사용하여, 이를 `veg_chain`에 전달합니다.

마지막으로, `final_chain.invoke({"cuisine": "indian"})`를 호출하면, "indian"이라는 입력을 기반으로 `final_chain`이 실행됩니다.

```py

chef_chain = chef_prompt | chat


veg_chain = veg_chef_prompt | chat


final_chain = {"recipe": chef_chain} | veg_chain

final_chain.invoke({"cuisine": "indian"})
```

### Streaming

- 서버가 데이터를 처리하면서 바로바로 결과를 보내줄 수 있어, 응답을 기다리지 않고도 부분적인 결과를 확인 가능
- SSE 표준을 따름

### [GPT parameters](https://python.langchain.com/v0.1/docs/integrations/llms/gpt4all/#import-gpt4all)

- [StreamingStdOutCallbackHandler](https://api.python.langchain.com/en/latest/callbacks/langchain_core.callbacks.streaming_stdout.StreamingStdOutCallbackHandler.html)
  - 스트리밍용 콜백 핸들러. 스트리밍을 지원하는 LLM에서만 작동한다.
  - 모델이 데이터를 생성하는 즉시 해당 데이터를 콘솔에 출력하여 사용자에게 보여줄 수 있습니다.
  - 긴 응답을 기다릴 필요 없이, 점진적으로 결과를 확인할 수 있게 해주는 매우 유용한 도구

```py
chat = ChatOpenAI(openai_api_key=api_key,temperature=0.1,
                  streaming=True,
                  callbacks=[
                      StreamingStdOutCallbackHandler(),
                      ],)
```

## 3.5 Recap (05:21)
