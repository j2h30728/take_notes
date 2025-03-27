// HTTP : Node.js의 기본 모듈로, HTTP 서버를 생성하고 관리하는데 사용됨.
import http from "http";
// WebSocket : WebSocket은 클라이언트와 서버 간에 양방향 통신을 가능하게 하는 프로토콜.
import WebSocket from "ws";
// Express : 웹 애플리케이션의 라우팅, 미들웨어, 뷰 렌더링 등 구현하는 node.js 의 프레임워크
import express from "express";

// Express 애플리케이션 인스턴스를 생성
const app = express();

// Pug를 뷰 엔진으로 설정.
// Pug : 서버 사이드에서 HTML을 동적으로 생성할 수 있게 해주는 템플릿 엔진
app.set("view engine", "pug");
app.set("views", __dirname + "/views");

// 정적 파일(예: CSS, JavaScript, 이미지 파일 등)을 제공하기 위한 미들웨어를 설정. 클라이언트 사이드에서 직접 접근할 수 있게 해준다.
app.use("/public", express.static(__dirname + "/public"));

// 루트 URL ('/')에 대한 GET 요청을 처리 : 홈 페이지를 렌더링
app.get("/", (_, res) => res.render("home"));

// 위에서 정의되지 않은 모든 경로에 대한 요청을 루트 URL로 리다이렉트 : 사용자가 잘못된 URL로 접근했을 때 기본 페이지로 돌려보냄
app.get("/*", (_, res) => res.redirect("/"));

// HTTP 서버를 생성하고, Express 애플리케이션을 이 서버에 연결. 이렇게 함으로써 HTTP 요청을 처리할 수 있다.
const server = http.createServer(app);

// WebSocket 서버를 생성하고, 이를 HTTP 서버에 연결합니다. WebSocket 서버는 클라이언트와 실시간 양방향 통신을 위해 사용된다.
// 웹 서버와 WebSocket 서버가 같은 포트를 공유하게 되며,(두 서버가 통합되어있다고 볼 수 있음.) 설정을 단순화하고, 리소스 사용을 효율적으로 만든다.
const wss = new WebSocket.Server({ server });

// 연결된 WebSocket 클라이언트를 추적하기 위한 배열.
const sockets = [];

// WebSocket 서버에 클라이언트가 연결되었을 때 실행
wss.on("connection", (socket) => {
  sockets.push(socket); // 연결된 클라이언트를 배열에 추가 (연결된 클라이언트에게 동일한 메시지 전달하기 위함)

  socket["nickname"] = "Anonymous"; // 기본적으로 연결된 클라이언트에 "Anonymous"이라는 닉네임을 할당

  console.log("Connected to Browser ✅");

  // 클라이언트 연결이 끊어졌을 때의 이벤트 리스너를 등록
  socket.on("close", () => {
    console.log("Disconnected from the Browser ❌");
  });

  // 클라이언트 => 서버
  // 클라이언트로 부터 메시지를 받았을 때의 이벤트 리스너를 등록 (모든 메시지는 "message"로 동일하기 때문에 내부에서 type으로 구분해주어야 함)
  socket.on("message", (msg) => {
    const message = JSON.parse(msg); // JSON 형식의 메시지를 파싱
    switch (
      message.type // 메시지 타입에 따라 적절한 처리
    ) {
      case "new_message": // 새 메시지 요청일 경우, 모든 클라이언트에게 메시지를 전송
        sockets.forEach((aSocket) => aSocket.send(`${socket.nickname}: ${message.payload}`));
        break;
      case "nickname": // 닉네임 변경 요청일 경우, 해당 클라이언트의 닉네임을 변경
        socket["nickname"] = message.payload;
        break;
    }
  });
});

// 설정된 포트(여기서는 3000)에서 서버를 시작. 서버가 시작되면 콘솔에 로그를 출력하는 함수가 호출됨
server.listen(3000, () => console.log(`Listening on http://localhost:3000`));
