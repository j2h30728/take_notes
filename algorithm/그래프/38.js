/**
 * 깊이 우선 탐색 순회
 * @param {string[][]} graph
 * @param {string} start
 * @returns {string[]}
 */
function solution(graph, start) {
  //그래프를 인접 리스트로 변환
  const adjList = {};
  graph.forEach(([u, v]) => {
    if (!adjList[u]) adjList[u] = [];
    adjList[u].push(v);
  });

  function dfs(node, visited, result) {
    visited.add(node); // 현재 노드를 방문한 노드들의 집합에 추가
    result.push(node); // 현재 노드를 결과 배열에 추가
    (adjList[node] || []).forEach((neighbor) => {
      // 현재 노드의 인접한 노드 순회
      if (!visited.has(neighbor)) {
        // 아직 방문하지 않은 노드라면
        dfs(neighbor, visited, result);
      }
    });
  }

  const visited = new Set();
  const result = [];
  dfs(start, visited, result); // 시작 노드에서 깊이 우선 탐색 시작
  return result;
}

const log = console.log;
log(
  solution(
    [
      ["A", "B"],
      ["B", "C"],
      ["C", "D"],
      ["D", "E"],
    ],
    "A"
  )
); //['A','B','C','D','E']
log(
  solution(
    [
      ["A", "B"],
      ["A", "C"],
      ["B", "D"],
      ["B", "E"],
      ["C", "F"],
      ["E", "F"],
    ],
    "A"
  )
); //['A','B','D','E','F','C']
