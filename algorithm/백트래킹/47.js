/**
 * 1부터 N까지 숫자 중 합이 10이 되는 조합 구하기
 * @param {number} N
 * @returns {number[]}
 */
function solution(N) {
  const results = [];

  function backtrack(sum, selectedNms, start) {
    if (sum === 10) {
      results.push(selectedNms);
      return;
    }
    for (let i = start; i <= N; i++) {
      if (sum + i <= 10) {
        backtrack(sum + i, selectedNms.concat(i), i + 1);
      }
    }
  }
  backtrack(0, [], 1);
  return results;
}

const log = console.log;
log(solution(5)); // [[1,2,3,4],[1,4,5],[2,3,5]]
log(solution(2)); // []
log(solution(7)); // [[1,2,3,4], [1,2,7], [1,3,6], [1,4,5], [2,3,5], [3,7], [4,6]]
