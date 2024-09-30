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
      const item = this.items[this.topIndex];
      delete this.items[this.topIndex];
      this.topIndex--;
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

const stack = new Stack(10);
// console.log(stack.getLength());
stack.push(1);
stack.push(2);
console.log(stack);

stack.pop();
console.log(stack);

// stack.push(4);
// stack.push(5);
// console.log(stack.getLength());
// stack.push(1);
// stack.push(2);
// console.log(stack.getLength());
// stack.push(1);
// stack.push(2);
// console.log(stack);
// console.log(stack.isFull());
