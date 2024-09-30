/**
 * 트리 순회
 * @param {number[]} nodes
 * @returns {string[]}
 */
function solution(nodes) {
  // 반환된 문자열에서 마지막 공백을 제거한 뒤 배열로 반환
  return [전위순회(nodes).slice(0, -1), 중위순회(nodes).slice(0, -1), 후위순회(nodes).slice(0, -1)];
}

function 전위순회(nodes, idx) {
  //idx가 노드 배열의 길이보다 작을 때만 재귀 호출
  if (idx < nodes.length) {
    // 루트 노드를 출력한 다음, 왼쪽, 오른쪽 서브 트리를 재귀 호출하여 출력 순서대로 이어 붙임
    let ret = `${nodes[idx]} `;
    ret += 전위순회(nodes, idx * 2 + 1);
    ret += 전위순회(nodes, idx * 2 + 2);
    return ret;
  }
  return ""; // idx가 노드의 배열의 길이와 같거나 크면 빈 문자열 반환
}
function 중위순회(nodes, idx) {
  if (idx < nodes.length) {
    // 왼쪽 서브 트리를 먼저 재귀 호출하여 출력 순서대로 이어붙임
    let ret = 중위순회(nodes, idx * 2 + 1);
    //루트 노드를 출력한 다음, 오른쪽 서브트리를 재귀 호출하여 출력 순서대로 이어 붙인다.
    ret += `${nodes[idx]} `;
    ret += 중위순회(nodes, idx * 2 + 2);
    return ret;
  }
  return "";
}
function 후위순회(nodes, id) {
  if (idx < nodes.length) {
    // 왼쪽 서브 트리와 오른쪽 서브 트리를 재귀 호출하여 출력 순서대로 이어 붙인다.
    let ret = 후위순회(nodes, idx * 2 + 1);
    ret += 후위순회(nodes, idx * 2 + 2);
    //루트 노드를 출력
    ret = `${nodes[idx]} `;
    return ret;
  }
  return "";
}

log(solution([1, 2, 3, 4, 5, 6, 7])); // ["1 2 4 5 3 6 7", "4 2 5 1 6 3 7", "4 5 2 6 7 3 1"]
