## 큐 (Queue)

1. 자료구조 개념:

   - 큐(queue)는 선입선출(FIFO, First In First Out) 원칙에 따라 작동하는 자료구조
   - 양쪽이 뚫려 있는 통과 같은 저장 공간에 한 쪽에는 데이터를 저장하고, 다른 한쪽으로는 먼저 저장한 순서대로 데이터를 빼낸다.

2. 예시 입력 / 출력:
   입력: [1, 2, 3, 4]
   출력: [2, 3, 4] (shift한 결과)

3. 자료구조의 시간 복잡도:

   - Push: O(1)
   - Pop: O(1)
   - Top: O(1)

4. 해당 자료구조를 활용하는 분야:

   - 작업 대기열
     - 네트워크 통신을 할 때 다수의 클라이언트에서 서버에 작업을 요청하면 서버는 요청이 들어온 순서대로 작업 처리
   - 이벤트 처리
     - 어떤 애플리케이션이나 시스템에서 사용자의 이벤트
     - 예) 키보드 입력이나 마우스 움직임을 처리할 때 사용

5. 상세과정:

   - 스택 생성: 리스트를 초기화하여 스택으로 사용
   - Push: 배열의 push 메소드를 사용하여 요소를 큐의 맨 뒤에 추가
   - Pop : 배열의 shift 메소드를 사용하여 큐의 맨 앞 요소를 삭제하고 반환
   - Front: 배열의 첫 번째 요소를 참조하여 큐의 첫 번째 요소를 확인
   - Rear: 배열의 마지막 요소를 참조하여 큐의 마지막 위 요소를 확인

6. 상세 내용

- 배열
  - 베열을 사용하게되면, shift의 시간복잡도갸 O(1)이 아니기 때문에 진짜 큐는 아니다.
  - 또한, rear와 front가 계속 증가하기 때문에 배열 메모리가 계속 증가하게 된다.
- 연결 리스트
  - 자바스크립트에 제공되지 않기떄문에 직접 구현해서 사용해야한다.
  - 배열을 사용하는 것보다 메모리 사용 측변에서 더 효율적이다.

문제를 푸는 경우, 우선 shift 를 사용하여 큐를 대체하거나 배열을 이용하는 방식으로 진행

### 배열

```js
class Queue {
  items = [];
  front = 0;
  rear = 0;

  push(item) {
    this.items.push(item);
    this.rear++;
  }

  pop() {
    return this.item[this.front++];
  }

  isEmpty() {
    return this.front === this.rear;
  }
}
```

### 연결리스트

```js
class Node {
  constructor(data) {
    this.data = data; // 요소의 값
    this.next = null; // 다음 요소를 참조
  }
}

class Queue {
  constructor() {
    this.head = null; // 첫 번째 요소 참조
    this.tail = null; // 첫 번째 요소 참조
    this.size = 0; // 큐의 길이
  }

  push(data) {
    //새로운 요소 생성
    const newNode = new Node(data);

    if (!this.head) {
      //큐가 비어있다면 head와 tail을 모두 새로 생성한 요소로 설정
      this.head = newNode;
      this.tail = newNode;
    } else {
      // 아니면 현재 tail의 next 속성을 새로운 요소로 설정 후 tail이 새로운 요소를 참조호도록 설정
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.size++; //큐 길이 증가
  }

  pop() {
    //head가 null이라면 비어 있다는 뜻
    if (!this.head) {
      return null;
    }
    // 두 번째 요소를 head의 참조로 변경하면
    // 자연스럽게 첫 번쨰 요소가 사라짐
    const removeNode = this.head;
    this.head = this.head.next;

    //만약 두 번째 요소가 없었다면
    //큐가 비어 있다는 뜻이니 tail도 null로 설정
    if (!this.head) {
      this.tail = null;
    }

    this.size--;
    return removeNode.data;
  }

  isEmpty() {
    return this.size === 0;
  }
}
```

```js
class Queue {
  constructor() {
    this.items = {}; // 큐의 요소를 저장하는 객체
    this.headIndex = 0; // 큐의 맨 앞 요소의 인덱스
    this.tailIndex = 0; // 큐에 다음 요소가 추가될 인덱스
  }

  enqueue(item) {
    this.items[this.tailIndex] = item; // 큐의 끝에 요소를 추가
    this.tailIndex++; // tailIndex 증가
  }

  dequeue() {
    if (this.headIndex !== this.tailIndex) {
      // 큐가 비어있지 않은 경우에만
      const item = this.items[this.headIndex]; // 맨 앞의 요소를 가져옴
      delete this.items[this.headIndex]; // 해당 요소를 큐에서 제거
      this.headIndex++; // headIndex 증가
      return item; // 제거된 요소 반환
    }
  }

  peek() {
    return this.items[this.headIndex]; // 큐의 맨 앞 요소 반환 (제거하지 않음)
  }

  getLength() {
    return this.tailIndex - this.headIndex; // 큐의 현재 길이 계산
  }
}
```
