/**
 * 너비 우선 탐색 순회
 * @param {number[][]} graph
 * @param {number} start
 * @returns {number[]}
 */
function solution(graph, start) {
  // 그래프를 인접 리스트로 변환
  const adjList = {};
  for (let [u, v] of graph) {
    if (!adjList[u]) adjList[u] = [];
    adjList[u].push(v);
  }

  const visited = new Set();

  const queue = new Queue();
  queue.push(start);
  visited.push(start);
  const result = [start];

  while (!queue.isEmpty()) {
    const node = queue.pop();
    for (const neighbor of adjList[node] || []) {
      if (!visited.has(neighbor)) {
        queue.push(neighbor);
        visited.add(neighbor);
        result.push(neighbor);
      }
    }
  }
  return result;
}

class Queue {
  items = [];
  front = 0;
  rear = 0;

  push(item) {
    this.items.push(item);
    this.rear++;
  }
  pop() {
    return this.items[this.front++];
  }
  isEmpty() {
    return this.front === this.rear;
  }
}

const log = console.log;
log(
  solution(
    [
      [1, 2],
      [1, 3],
      [2, 4],
      [2, 5],
      [3, 6],
      [3, 7],
      [4, 8],
      [5, 8],
      [5, 9],
      [6, 9],
      [7, 9],
    ],
    1
  )
); // [1,2,3,4,5,6,7,8,9]
log(
  solution(
    [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 0],
    ],
    1
  )
); // [1,2,3,4,5,0]
