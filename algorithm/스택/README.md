## 스택 (stack)

1. 자료구조 개념:

   - 스택(Stack)은 선입후출(FILO, First In Last Out) 원칙에 따라 작동하는 자료구조
   - 새로운 요소는 스택의 상단에 추가되고, 상단의 요소만이 삭제될 수 있습니다.

2. 예시 입력 / 출력:
   입력: [1, 2, 3, 4]
   출력: [1, 2, 3] (4를 pop한 결과)

3. 자료구조의 시간 복잡도:

   - Push: O(1)
   - Pop: O(1)
   - Top: O(1)

4. 해당 자료구조로 풀 수 있는 문제 예시:

   - 괄호 짝 맞추기
   - 브라우저 뒤로 가기 기능
   - 트리의 깊이 우선 탐색(DFS)

5. 상세과정:
   - 스택 생성: 배열를 초기화하여 스택으로 사용
   - Push: 배열의 push 메소드를 사용하여 요소를 스택의 맨 위에 추가
   - Pop: 배열의 pop 메소드를 사용하여 스택의 맨 위 요소를 삭제하고 반환
   - Top: 배열의 마지막 요소를 참조하여 스택의 맨 위 요소를 확인

### 스택의 ADT (스택의 추상 자료형)

#### 삽입(Push)

스택에 데이터를 삽입

#### 추출(Pop)

스택에 데이터를 추출

```js
class Stack {
  constructor(maxSize) {
    //  스택을 초기화하고, 내부적으로 객체를 사용하여 요소들을 저장
    this.items = {};
    this.topIndex = -1; // 다음 요소가 들어갈 위치
    this.maxSize = maxSize;
  }

  //새 요소를 스택의 맨 위에 추가
  push(item) {
    if (this.isFull()) {
      console.log("스택이 가득 찼습니다.");
    } else {
      this.topIndex++;
      this.items[this.topIndex] = item;
    }
  }

  //스택의 맨 위 요소를 제거하고 반환
  pop() {
    if (this.isEmpty()) {
      console.log("스택이 비어있습니다.");
      return null;
    } else {
      this.topIndex--;
      const item = this.items[this.topIndex];
      delete this.items[this.topIndex];
      return item;
    }
  }

  //스택의 맨 위 요소를 반환
  peek() {
    if (this.topIndex > 0) {
      return this.items[this.topIndex - 1];
    }
  }

  isEmpty() {
    return this.topIndex === 0;
  }

  isFull() {
    return this.items.length === this.maxSize;
  }

  getLength() {
    return this.topIndex;
  }
}
```
