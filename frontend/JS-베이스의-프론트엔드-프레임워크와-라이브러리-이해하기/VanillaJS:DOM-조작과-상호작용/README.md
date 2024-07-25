# Vanilla JavaScript : DOM 조작과 상호작용

## 웹 프론트엔드 개발

- 정적인 HTML 문서를 (사용자와) 상호작용을 통해 동적으로 변형시키는 것
- 요구사항을 사용자와 상호작용을 통해 정적인 HTML 문서를 동적으로 변화시키는 것으로 해석하고, 이를 JavaScript를 활용하여 브라우저가 제공하는 DOM API(selector, event, manipulation)로 구현하는 것
  - +) css를 이용한 스타일링, Ajax등의 네트워킹, 브라우저 API

## 초창기 자바스크립트 개발의 특징

- 자바스크립트는 웹 브라우저가 제공하는 API를 통해서 페이지의 컨텐츠를 동적으로 변경하는 역할을 수행
- 화면의 변화를 중심으로 사고하며 직접 DOM을 조작하여 요구사항을 구현
- DOM을 통해 HTML의 요소를 선택하고, 이벤트를 기다리고, 데이터를 가공하여, DOM 조작을 통해 HTML을 변경하는 방식으로 개발

## DOM을 이용한 웹 프론트엔드 개발 일반화 모델

이벤트(Event)란, 사용자 상호작용이나 시스템 반응과 같이 특정 시점에 웹 페이지가 발생하는 동작이며, 이 과정에서 발생하는 상세한 정보를 포함하는 개념.
예를 들어, 사용자가 클릭하거나 키보드를 입력하는 행위, 페이지나 이미지를 로드되는 순간등이 이에 해당됨

> 각 단계 자체가 중요한 것이 아니라, 요구사항을 컴퓨터가 알아들을 수 있게 자바스크립트로 어떻게 분리하여 작성할 것인지 이러한 개념적 단계를 머리속에 내재화할 것

> 버튼을 클릭하면, 좋아요 +1을 해서 1likes로 변경

#### 1. 선택하기 : Select

개발 과정 첫 단계로, 자바스크립트에 사용자의 상호작용을 감지할 HTML요소를 선택

- 버튼을

#### 2. 상호작용 감지 : Event Listen

선택된 요소에 대해 기다리는 특정 이벤트(클릭, 마우스오버)를 설정하여 사용자의 행동감지

- 클릭하면,

#### 3. 데이터 가공 : Business Logic

이벤트가 발생하면 기존 데이터를 가공하여 새로운 데이터를 만들어 냄

- 좋아요 +1을 해서

#### 4. 화면 변화 : Manipulation

자바스크립트를 통해 HTML의 내용을 동적으로 변경하고 조작

- 1 likes로 변경

## 자바스크립트의 기능을 확장하는 API, 그리고 DOM

- 웹프론트엔드 개발은 브라우저에서 동작
- 웹 브라우저는 자바스크립트를 통해 API를 제공하고 이것을 이용하여 웹 개발 가능
  - **API (Application Programming Interface)** : 어플리케이션이 가진 기능을 특정 언어를 통해 조작할 수 있도록 기능을 제공하는 것
  - 웹브라우저에서 DOM 이외에도 많은 API 제공
- **DOM(Document Object Model)**
  - HTML 요소를 자바스크립트 객체로 표현
  - DOM 객체의 수정이 웹페이지에 실시간으로 반영하도록 제공하여 동적으로 웹 페이지를 제어 가능

### DOM API

HTML의 각 요소들을 자바스크립트 객체로 변환하여 제공하고, 이 객체들의 수정사항을 웹 페이지에 실시간으로 반영하는 API

### 웹 프론트엔드 개발 모델에 따른, DOM API의 3가지 분류

1. 선택자 API : `document.getElementById('likeButton')`,...
2. 이벤트 리스터 API : `addEventListener()`, `removeEventListener()`
3. DOM 조작 API : `innerHTML`, `classList`, `style`, `setAttribute`, `createElement()`, `appendChild()`, `insertAfter()

#### 1. 선택자 : Selector

1. id로 찾기 : `document.getElementById()`
2. CSS 선택자로 찾기 : `document.querySelect()`
3. CSS 선택자로 여러 항목 찾기 : `document.querySelectorAll()`

#### 2. 이벤트 : Event Listener

1. 이벤트 리스너 추가 : `addEventListener()`
2. 이벤트 리스너 제거 : `removeEventListener()`

#### 3. HTML 변경 : DOM Manipulation

1. Text 조작 : `element.TextContent`, `element.InnerText`, `element.InnerHTML`
2. Style 조작 :`element.style.property`
3. Class 조작 : `element.classList.add(className)`
4. Attribute 조작 : `element.setAttribute()`
5. Property 조작 : `element.scrollTop`
6. Children 조작 :`document.createElement()`, `appendChild()`, `removeChild()`, `insertBefore()`

### DOM을 포함한 자바스크립트로 웹프론트를 개발하는 멘탈모델

#### 1. 정적 HTML

- 최초에 어떻게 보여줄 것인가
- HTML 사용

#### 2. 요소 탐색

- HTML에서 어떤 항목을 찾아서 선택할 것인지
- DOM Selector 이용

#### 3. 사용자와 상호작용

- 어떠한 이벤트를 걸 것인지
- DOM Event Listener 이용

#### 4. 비즈니스 로직

- 어떤 데이터를 가져와서 어떤 새로운 데이터로 가공할 것인지
- Javascript 이용

#### 5. 화면 변화

- 어떠한 화면으로 어떻게 변경해서 보여줄 것인지
- DOM Manipulation 이용 (text, class, style, attribute, property, children)

## 실습

### 요구사항

1. 할 일 목록 생성 - 사용자가 새로운 할 일을 입력할 수 있게 하는 기능
2. 할 일 목록 표시 - 입력된 할 일을 목록 형태로 보여주는 기능
3. 할일 완료 표시 - 할 일의 완료 상태를 표시 및 변경할 수 있는 기능
4. 할 일 개수 표시 - 전체 및 남아 있는 할 일의 개수를 표시하는 기능
5. 할 일 삭제 - 목록에서 특정 할 일을 삭제하는 기능
6. 할 일 수정 - 이미 입력된 할 일의 내용을 수정하는 기능
7. 할 일 필터링 - 완료된 할 일과 진행 중인 할 일을 구분하여 볼 수 있는 필터 기능
8. 할 일 일괄 완료 처리 - 모든 할 일을 한 번에 완료 처리할 수 있는 기능
9. 할 일 일괄 삭제 처리 - 완료된 할 일만을 선택저으로 일괄 삭제하는 기능
10. 지속성 - 데이터를 지속적으로 저장하여, 웹 페이지 새로고침 후에도 할 일 목록을 유지하는 기능
