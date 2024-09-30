/**
 * 요세푸스 문제
 * - N명의 사람이 원 형태로 서 있습니다. 각 사람은 1부터 N까지 번호표를 갖고 있습니다. 그리고 임의의 숫자가 K가 주어졌을 때 다음과 같이 사람을 없앱니다.
 *
 *  - 1번 번호표를 가진 사람을 기준으로 K번째 사람을 없앱니다.
 *  - 없앤 사람 다음 사람을 기준으로 하고 다시 K번째 사람을 없앱니다.
 * N과 K가 주어질 때 마지막에 살아있는 사람의 번호를 반환하는 함수 구현하기
 * @param {number} N - 10진수
 * @param {number} K - 10진수
 * @returns {number} - 10진수
 */
function solution(N, K) {
  const queue = new Queue();

  // 번호표는 1번부터 존재 (1번부터 N까지의 번호를 queue에 추가)
  for (let i = 1; i <= N; i++) {
    queue.push(i);
  }

  while (queue.size() > 1) {
    // queue에 하나의 요소가 남을 떄까지 진행
    for (let i = 0; i < K - 1; i++) {
      // K번째 요소를 찾기위해 앞에서 제거후, 바로 뒤에 추가
      queue.push(queue.pop());
    }
    queue.pop(); //K번쨰 요소 제거
  }
  return queue.pop(); // 마지막 남은 요소 바노한 (queue.size() > 1)
}

class Queue {
  items = [];
  front = 0;
  rear = 0;

  push(item) {
    this.items.push(item);
    this.rear++;
  }

  size() {
    return this.rear - this.front;
  }

  pop() {
    return this.items[this.front++];
  }
}

const log = console.log;

log(solution(5, 2));
