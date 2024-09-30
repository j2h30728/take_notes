/**
 * 이진 탐색 트리 구현
 * @param {number[]} lst
 * @param {number[]} searchList
 * @returns {boolean[]}
 */
function solution(list, searchList) {
  const bst = new BST();
  for (const key of list) {
    bst.insert(key);
  }
  const result = [];
  for (const searchVal of searchList) {
    if (bst.search(searchVal)) {
      result.push(true);
    } else {
      result.push(false);
    }
  }
  return result;
}
class Node {
  constructor(key) {
    this.left = null;
    this.right = null;
    this.val = key;
  }
}

// 이진 탐색 트리 클래스
class BST {
  constructor() {
    // 초기에 아무 노드도 없는 상태
    this.root = null;
  }

  insert(key) {
    if (!this.root) {
      this.root = new Node(key);
    } else {
      let curr = this.root;
      while (true) {
        if (key < curr.val) {
          if (curr.left) {
            curr = curr.left;
          } else {
            curr.left = new Node(key);
            break;
          }
        } else {
          if (curr.right) {
            curr = curr.right;
          } else {
            curr.right = new Node(key);
            break;
          }
        }
      }
    }
  }

  search(key) {
    let curr = this.root;
    while (curr && curr.val !== key) {
      if (key < curr.val) {
        curr = curr.left;
      } else {
        curr = curr.right;
      }
    }
    return curr;
  }
}

const log = console.log;
log(solution([5, 3, 8, 4, 2, 1, 7, 10], [1, 2, 5, 6])); // [true, true, true, false]
log(solution([1, 3, 5, 7, 9], [2, 4, 6, 8, 10])); // [false, false, false, false, false]
