// 체스판의 크기를 정의합니다. 이 경우 8x8 체스판입니다.
let n = 8;

// queens 배열은 현재 체스판에 배치된 퀸들의 위치를 저장합니다.
let queens = [];

// possible 함수는 특정 위치에 퀸을 놓을 수 있는지를 검사합니다.
function possible(x, y) {
  // 현재 배치된 모든 퀸들의 위치를 확인합니다.
  for (let [a, b] of queens) {
    // 만약 같은 행(x) 또는 같은 열(y)에 이미 퀸이 있다면 false를 반환합니다.
    if (a == x || b == y) return false;

    // 대각선상에 퀸이 있는지도 확인합니다. 대각선상의 퀸은 행과 열의 차이가 같을 때입니다.
    if (Math.abs(a - x) == Math.abs(b - y)) return false;
  }

  // 위 조건들을 모두 통과하면 해당 위치에 퀸을 놓을 수 있으므로 true를 반환합니다.
  return true;
}

// 가능한 모든 퀸의 배치 방법의 수를 세는 변수입니다.
let count = 0;

// dfs 함수는 깊이 우선 탐(Depth-first search)색을 통해 퀸을 배치합니다.
function dfs(row) {
  // 모든 행에 퀸을 배치했다면 하나의 해를 찾은 것이므로 count를 증가시킵니다.
  if (row == n) {
    count += 1;
    return;
  }

  // 현재 행의 모든 열에 대해 퀸을 놓아보며 가능한지 확인합니다.
  for (let i = 0; i < n; i++) {
    // 만약 현재 위치에 퀸을 놓을 수 없다면, 다음 열로 넘어갑니다.
    if (!possible(row, i)) continue;

    // 현재 위치에 퀸을 놓을 수 있다면, queens 배열에 퀸의 위치를 추가합니다.
    queens.push([row, i]);

    // 다음 행에 대해 같은 과정을 반복합니다.
    dfs(row + 1);

    // 현재 위치에서 퀸을 제거하고, 다른 위치에 퀸을 놓는 경우를 탐색합니다 (백트래킹).
    queens.pop();
  }
}

// 첫 번째 행에서 탐색을 시작합니다.
dfs(0);

// 모든 가능한 퀸의 배치 방법의 수를 출력합니다.
console.log(count);
