function bfs(graph, start) {
  const queue = [start]; // 큐에 시작 노드를 넣음
  const visited = new Set([start]); // 방문한 노드를 기록하는 집합
  const result = []; // 방문 순서를 기록

  while (queue.length > 0) {
    const node = queue.shift(); // 큐에서 가장 앞에 있는 노드를 꺼냄
    result.push(node); // 방문 순서에 추가

    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        // 방문하지 않은 이웃 노드를 큐에 추가
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return result;
}
