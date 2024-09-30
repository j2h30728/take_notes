class Node {
  constructor(item) {
    this.data = item;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  push(item) {
    const newNode = new Node(item);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  pop() {
    if (!this.head) {
      return null;
    }
    const removeNode = this.head;
    this.head = this.head.next;

    if (!this.head) {
      return null;
    }
    this.size--;
    return removeNode.data;
  }

  isEmpty() {
    return this.size === 0;
  }
}
