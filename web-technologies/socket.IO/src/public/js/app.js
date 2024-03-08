// Socket.IO 클라이언트 인스턴스를 초기화
const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomName;

function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#msg input");
  const value = input.value;

  //[클라이언트 -> 서버] 서버로 'new_message' 이벤트와 메시지를 전송한다.
  // input.value : 사용자가 입력한 메시지
  // rooName : 방 이름
  // 콜백함수 : 서버에서 'new_message' 이벤트에서 실행시킬 콜백함수
  socket.emit("new_message", input.value, roomName, () => {
    addMessage(`You: ${value}`);
  });
  input.value = "";
}

function showRoom() {
  // 화면에서 환영메시지 숨기고 채팅방을 보여준다.
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;
  const msgForm = room.querySelector("#msg");
  msgForm.addEventListener("submit", handleMessageSubmit);
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");

  //[클라이언트 -> 서버]  서버로 'enter_room' 이벤트와 방 이름을 전송합니다.
  socket.emit("enter_room", input.value, showRoom);
  roomName = input.value;
  input.value = "";
}

// 환영 메시지 화면에서 roomName을 입력하고 제출하면 서버에서 해당 roomName에 클라이언트를 join(참여)시키고 클라이언트는 채팅방화면으로 전환된다.
form.addEventListener("submit", handleRoomSubmit);

//[서버 -> 클라이언트]  서버로부터 'welcome' 이벤트를 받을 때 실행할 콜백 함수
// enterUser : 새로 들어온 사용자 (서버에서는 socket.to(roomName).emit("welcome", socket.nickname, countRoom(roomName));이기 때문)
// newCount : 해당 방의 참여자수
socket.on("welcome", (enterUser, newCount) => {
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName} (${newCount})`;
  addMessage(`${enterUser}가 방에 참여했습니다.`);
});

//[서버 -> 클라이언트]
socket.on("bye", (leftUser, newCount) => {
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName} (${newCount})`;
  addMessage(`${leftUser}가 방을 떠났습니다.`);
});

//[서버 -> 클라이언트] 서버로부터 'new_message' 이벤트를 받을 때 실행할 콜백 함수  (다른 사용자가 채팅 칠 경우)
socket.on("new_message", addMessage);
