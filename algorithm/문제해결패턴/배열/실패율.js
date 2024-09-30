/**
 * [실패율](https://school.programmers.co.kr/learn/courses/30/lessons/42889)
 * @param {Number} N
 * @param {Number[]} stages
 * @returns {Number[]}
 */
function solution1(N, stages) {
  const success = new Array(N + 1).fill(0);
  stages.forEach((stage) => {
    for (let i = 0; i < stage; i++) {
      success[i] += 1;
    }
  });
  const arr = [];
  let people = stages.length;
  for (let i = 0; i < success.length - 1; i++) {
    const failCount = success[i] - success[i + 1];
    arr.push(failCount / people);
    people -= failCount;
  }
  const result = Object.entries(arr)
    .sort((a, b) => b[1] - a[1])
    .map((x) => +x[0] + 1);
  return result;
}

function solution2(N, stages) {
  const result = [];
  for (let i = 1; i <= N; i++) {
    const success = stages.filter((x) => x >= i).length;
    const cur = stages.filter((x) => x === i).length;
    result.push([i, cur / success]);
  }
  return result.sort((a, b) => b[1] - a[1]).map((x) => x[0]);
}
