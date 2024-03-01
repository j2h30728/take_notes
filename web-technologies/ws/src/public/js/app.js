// DOM 요소 선택
const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");
// 현재 호스트에 WebSocket 연결
const socket = new WebSocket(`ws://${window.location.host}`);

// 메시지 객체 생성 및 JSON 문자열로 변환
// 웹서버에서는 다른 언어를 사용할 수도 있기때문에 자바스크립트 객체를 사용하지 않고 문자열 값으로 보내주는 것이다.
function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
}

// 서버 연결 성공시 로그 출력
function handleOpen() {
  console.log("Connected to Server ✅");
}

// 이벤트 리스너 등록
socket.addEventListener("open", handleOpen); // 연결 이벤트
socket.addEventListener("message", (message) => {
  // 메시지 수신 이벤트
  const li = document.createElement("li");
  li.innerText = message.data; // 수신된 메시지로 리스트 아이템 생성
  messageList.append(li);
});
socket.addEventListener("close", () => {
  // 연결 종료 이벤트
  console.log("Disconnected from Server ❌");
});

// 메시지 전송 이벤트 핸들러
function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(makeMessage("new_message", input.value)); // 'new_message' 타입으로 메시지 전송
  input.value = "";
}

// 닉네임 설정 이벤트 핸들러
function handleNickSubmit(event) {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value)); // 'nickname' 타입으로 닉네임 전송
  input.value = "";
}

// 폼 제출 이벤트 리스너 등록
messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);
