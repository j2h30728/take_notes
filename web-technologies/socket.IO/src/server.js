import http from "http";
import SocketIO from "socket.io";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

// HTTP 서버를 생성하고 Express 앱을 연결
const httpServer = http.createServer(app);
// 생성된 HTTP 서버를 Socket.IO 서버와 연결
const wsServer = SocketIO(httpServer);

// 공개 방 목록을 반환하는 함수
function publicRooms() {
  const {
    sockets: {
      adapter: { sids, rooms }, // sits와 rooms는 Map 객체
    },
  } = wsServer;
  const publicRooms = [];

  // Socket.IO 내부의 'rooms' Map을 순회 : 각 방을 순회하며 공개 방인지 확인.
  rooms.forEach((_, roomName) => {
    if (sids.get(roomName) === undefined) {
      // sids Map에 없는 방 이름은 공개 방으로 간주하고 publicRooms 배열에 추가합니다.
      publicRooms.push(roomName);
    }
  });
  return publicRooms;
}

// 특정 방에 있는 사용자 수를 세는 함수.
function countRoom(roomName) {
  // 'rooms.get(roomName)'을 통해 방을 찾고, 그 방의 크기(.size)를 반환 : rooms의 value는 key(방 이름)에 속한 소켓의 세션 ID를 모아둔 Set
  // 방이 존재하지 않는 경우, 안전하게 처리하기 위해 옵셔널 체이닝(?.)을 사용
  return wsServer.sockets.adapter.rooms.get(roomName)?.size;
}

// WebSocket 서버에 새로운 클라이언트가 연결될 때 실행되는 이벤트 리스너.
wsServer.on("connection", (socket) => {
  // 각 소켓(클라이언트)에 대한 기본 닉네임을 'Anonymous'로 설정
  socket["nickname"] = "Anonymous";

  // 모든 이벤트에 대해 로링, 이는 디버깅에 유용합
  socket.onAny((event) => console.log(`Socket Event: ${event}`));

  // 클라이언트가 새로운 채팅방에 입장하려고 할 때 실행된다.
  socket.on("enter_room", (roomName, done) => {
    socket.join(roomName); // 클라이언트를 해당 방에 조인시킴
    done(); // 클라이언트 측에서 전달된 콜백 함수를 실행

    // 방에 있는 다른 클라이언트들에게 'welcome' 이벤트를 전송(해당 socket을 제외한 다른 클라이언트)
    socket.to(roomName).emit("welcome", socket.nickname, countRoom(roomName));

    // 모든 클라이언트에게 방 목록의 변화를 알림
    // 채팅방에 참여자가 변화할 때마다 (즉, 새 사용자가 방에 입장하거나 기존 사용자가 방을 떠날 때) 모든 클라이언트에게 채팅방 목록 변화를 알리는 데 사용
    wsServer.sockets.emit("room_change", publicRooms());
  });

  // 클라이언트의 연결이 끊기기 시작할 때 실행된다. 클라이언트가 속한 모든 방에서 'bye' 이벤트를 전송.
  // countRoom(room) - 1 : 해당 클라이언트가 빠져나간 숫자를 의미
  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) => socket.to(room).emit("bye", socket.nickname, countRoom(room) - 1));
  });

  // 클라이언트의 연결이 완전히 끊어졌을 때 실행된다. 공개 방 목록을 업데이트하여 모든 클라이언트에게 전송한다.
  socket.on("disconnect", () => {
    wsServer.sockets.emit("room_change", publicRooms());
  });

  // 클라이언트로부터 새 메시지를 받았을 때 실행된다. 해당 메시지를 같은 방의 다른 클라이언트들에게 전송한다.
  socket.on("new_message", (msg, room, done) => {
    socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
    done();
  });

  // 클라이언트가 닉네임을 변경하려고 할 때 실행된다. 소켓에 새 닉네임을 할당한다.
  socket.on("nickname", (nickname) => (socket["nickname"] = nickname));
});

// 서버를 시작하고 리스닝 이벤트를 처리한다.
const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);
