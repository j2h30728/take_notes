# ws

## Socket

`socket` 객체는 서버와 특정 클라이언트 간의 WebSocket 연결을 대표한다.
이 연결을 통해 서버는 클라이언트와 데이터를 주고받고, 연결 상태를 관리할 수 있다.

WebSocket 프로토콜을 사용함으로써, 클라이언트와 서버 간의 양방향 통신이 실시간으로 이루어질 수 있어, 채팅 애플리케이션, 실시간 게임, 협업 도구 등 다양한 실시간 웹 애플리케이션을 구현할 수 있다.

`wss.on("connection", (socket) => { ... });` 구문에서의 `socket`은 WebSocket 연결이 성공적으로 수립되었을 때 생성되는 WebSocket 연결을 나타내는 객체이다.
이 `socket` 객체를 통해 서버는 해당 클라이언트와 실시간으로 데이터를 주고받을 수 있다.

#### `socket` 객체의 주요 사용 사례:

- **데이터 송신**: 서버는 `socket.send(data)` 메소드를 사용하여 해당 클라이언트에게 데이터를 보냄.(`data` : 문자열, 버퍼, 또는 다른 허용 가능한 메시지 형식)

- **데이터 수신**: 서버는 `socket` 객체에 `message` 이벤트 리스너를 등록하여 클라이언트로부터 메시지를 수신할 수 있다. 클라이언트가 메시지를 보낼 때마다 이 이벤트가 발생하고, 등록된 콜백 함수가 호출된다.

- **연결 종료**: `socket.close()` 메소드를 호출하여 언제든지 연결을 종료할 수 있다. 또한, 클라이언트가 연결을 종료할 경우, 서버는 `socket` 객체에 등록된 `close` 이벤트 리스너를 통해 이를 감지할 수 있다.

- **에러 처리**: `socket` 객체에 `error` 이벤트 리스너를 등록하여 연결 중 발생하는 에러를 처리할 수 있다.

#### 예제:

```javascript
wss.on("connection", (socket) => {
  console.log("New client connected");

  // 클라이언트로부터 메시지 수신
  socket.on("message", (message) => {
    console.log(`Received message: ${message}`);
  });

  // 클라이언트 연결 종료 감지
  socket.on("close", () => {
    console.log("Client disconnected");
  });

  // 에러 처리
  socket.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});
```

## new WebSocket.Server({server}) 와 new WebSocket.Server() 의 차이

주로 WebSocket 서버가 HTTP 서버와 통합되어 있느냐, 독립적으로 실행되느냐와 관련이 있다.

#### `const wss = new WebSocket.Server({ server });`

WebSocket 서버를 기존의 HTTP 서버에 연결한다. 여기서 `{ server }`는 WebSocket 서버가 사용할 HTTP/HTTPS 서버의 인스턴스를 지정한다.
**장점** : 단일 TCP 포트를 통해 HTTP(S) 요청과 WebSocket 연결을 모두 처리할 수 있다. 즉, 웹 서버와 WebSocket 서버가 같은 포트(예: 3000)를 공유하게 되며, 이는 설정을 단순화하고, 리소스 사용을 효율적으로 만든다.

```javascript
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
```

클라이언트는 웹사이트의 리소스를 요청할 때(HTTP 요청)와 실시간 데이터 통신을 위해(WebSocket 연결) 동일한 URL(`http://localhost:3000` 또는 `ws://localhost:3000`)을 사용할 수 있다.

#### `const wss = new WebSocket.Server();`

옵션 객체 없이 `WebSocket.Server`의 인스턴스를 생성한다. 이렇게 설정할 경우, WebSocket 서버는 독립적으로 작동하며, 기존 HTTP 서버와 자동으로 통합되지 않는다. 즉, 이 방식으로 WebSocket 서버를 설정하면 추가적인 설정 없이는 클라이언트와의 연결을 수립할 수 없다.

```javascript
const wss = new WebSocket.Server();
```

이 형태는 실제 사용에 있어서 추가적인 설정을 필요로 한다.
예를 들어,

- 서버의 포트를 직접 지정하거나, WebSocket 서버를 다른 방식으로 HTTP 서버와 연동해야 한다.
  0 또한, 이 방식은 WebSocket 서버가 독립적인 포트에서 리스닝할 때 사용할 수 있지만, 그렇게 하려면 `.listen` 메소드를 사용하여 포트를 명시적으로 지정해야 한다.
