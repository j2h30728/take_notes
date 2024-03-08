# socket.IO

## `sockets`

Socket.IO의 서버 인스턴스인 `wsServer`를 통해 접근

### `sockets.adapter`

- `sockets.adapter`는 Socket.IO 서버의 현재 상태를 나타내며, 모든 소켓의 세션 ID(`sids`)와 방 정보(`rooms`)를 관리하는 객체
- Adapter는 클라이언트(소켓)와 방 간의 관계를 관리하는 역할을 하며, 메모리 어댑터가 기본적으로 사용된다.

### `sids`

- `sids`는 각 소켓의 고유 세션 ID와 그 소켓이 속한 방의 집합을 매핑하는 Map 객체
- 이 Map 객체의 키는 소켓의 세션 ID이고, 값은 해당 소켓이 속한 방의 이름을 나타내는 Set
- 소켓이 어떤 방에도 속하지 않은 경우에도, 자신의 세션 ID를 키로 한 항목이 존재한다.

### `rooms`

- `rooms`는 방 이름과 그 방에 속한 소켓의 세션 ID들을 매핑하는 Map 객체.
- 이 Map 객체의 키는 방의 이름이고, 값은 해당 방에 속한 소켓의 세션 ID를 나타내는 Set
- 공개 방이(publicRooms)란, 이름이 지정된 방으로 외부에서 입장할 수 있는 방을 의미합니다.

```js
const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

function publicRooms() {
  const {
    sockets: {
      adapter: { sids, rooms },
    },
  } = wsServer;
  const publicRooms = [];

  rooms.forEach((_, roomName) => {
    if (sids.get(roomName) === undefined) {
      publicRooms.push(roomName);
    }
  });
  return publicRooms;
}
```

### `publicRooms` 함수의 동작 방식

1. `wsServer.sockets.adapter`에서 `sids`와 `rooms` 객체를 추출
2. `rooms` 객체를 순회하면서 각 방의 이름(`key`)을 확인
3. 해당 방 이름이 `sids` Map 객체에 없는 경우, 그 방은 공개 방. 이는 해당 방 이름이 소켓의 세션 ID가 아니라는 의미이며, 따라서 사용자가 생성한 공개 방으로 간주할 수 있다.
4. 공개 방으로 확인된 방의 이름을 `publicRooms` 배열에 추가한다.
5. 최종적으로 모든 공개 방의 이름이 담긴 `publicRooms` 배열을 반환한다.
