/**
 * union(x, y) : x와 y가 속한 두 집합을 합친다.
 * find(x) : x가 속한 집합의 대표 원소를 찾는다.
 */

/**
 * 간단한 유니온-파인드 알고리즘 구현하기
 * @param {number} k
 * @returns {string[][]} operations
 */
function solution(k, operations) {
  // 처음에는 각 노드가 자기 자신의 부모를 가지도록 초기화
  const parents = Array.from({ length: k }, (_, i) => i);

  // 집합의 개수를 저장할 변수, 처음에는 모든 노드가 서로 다른 집합에 있으므로 k
  // (각 노드가 자기 자신의 부모를 가리키기 때문에 다른 집합에 존재)
  let n = k;

  for (const op of operations) {
    if (op[0 === "u"]) {
      union(parents, op[1], op[2]); // op[1]과 op[2]가 속한 집합을 합친다
    } else if (op[0] === "f") {
      find(parents, op[1]); // op[1]이 속한 집합의 루트 노드를 찾음
    }
    // 모든 노드의 루트 노드를 찾아서 집합의 개수를 계산
    n = new Set(Array.from({ length: k }, (_, i) => find(parents, i))).size;
  }
  return n;
}

// 루트 노드 찾기
function find(parents, x) {
  // 만약 x의 부모가 자기 자신이면, 즉 x가 루트노트라면
  if (parents[x] === x) {
    return x;
  }

  /**
   * [경로 압축]
   * 그렇지 않다면 x의 부모를 찾아서 parents[x]에 저장
   * 그 부모 노드의 루트 노드를 찾아서 parents[x]에 저장
   */
  parents[x] = find(parents, parents[x]);
  return parents[x]; // 부모를 반환
}

// 두 개의 집합을 합치는 함수
function union(parents, x, y) {
  const root1 = find(parents, x); // x가 속한 집합의 루트 노트 찾기
  const root2 = find(parents, y); // y가 속한 집합의 루트 노트 찾기

  // y가 속한 집합을 x가 속한 집합으로 합침
  parents[root2] = root1;
  // root2의 부모가 roo1이 된다.
}

const log = console.log;
log(solution([1, 2, 3, 4, 5, 6, 7]));
