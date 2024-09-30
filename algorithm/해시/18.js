/**
 * 두 개의 수로 특정 값 만들기
 * @param {number[]} arr
 * @param {number} target
 * @returns {boolean}
 */
function solution(arr, target) {
  for (const num of arr) {
    const calculated = target - num;
    if (calculated !== num && arr.includes(calculated)) {
      return true;
    }
  }
  return false;
}

const log = console.log;

log(solution([1, 2, 3, 4, 8], 6)); //true
log(solution([2, 3, 5, 9], 10)); // false
