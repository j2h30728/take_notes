/**
 * 깊이 우선 탐색 (DFS) - 재귀 함수 구현
 * @param {Object} graph - 인접 리스트 형태의 그래프
 * @param {number} node - 현재 탐색할 노드
 * @param {Set} visited - 방문한 노드를 기록하는 집합
 * @param {number[]} result - 방문 순서 기록
 */
function dfsRecursive(graph, node, visited, result) {
  // 현재 노드를 방문 처리
  visited.add(node);
  result.push(node);

  // 이웃 노드를 재귀적으로 탐색
  for (const neighbor of graph[node] || []) {
    if (!visited.has(neighbor)) {
      dfsRecursive(graph, neighbor, visited, result);
    }
  }
}

/**
 * DFS 탐색을 시작하는 함수
 * @param {number[][]} graph - 간선 정보가 담긴 그래프
 * @param {number} start - 시작 노드
 * @returns {number[]} - DFS 순회 결과
 */
function dfs(graph, start) {
  // 그래프를 인접 리스트로 변환
  const adjList = {};
  for (const [u, v] of graph) {
    if (!adjList[u]) adjList[u] = [];
    if (!adjList[v]) adjList[v] = []; // 양방향 그래프인 경우 추가
    adjList[u].push(v);
    adjList[v].push(u); // 양방향 그래프가 아닌 경우 이 줄은 삭제
  }

  const visited = new Set(); // 방문한 노드를 기록하는 집합
  const result = []; // 방문 순서 기록

  // DFS 탐색 시작
  dfsRecursive(adjList, start, visited, result);

  return result;
}
