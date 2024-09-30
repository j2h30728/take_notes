/**
 * 괄호의 짝이 알맞는지 구한다.
 * @param {string} s - 예시 (())()
 * @returns {boolean}
 */
function solution(s) {
  const stack = [];
  for (const char of s) {
    if (char === "(") {
      stack.push(char);
    } else if (char === ")") {
      if (stack.length === 0) {
        return false;
      } else {
        stack.pop();
      }
    }
  }
  return stack.length === 0;
}
const log = console.log;

log(solution("(())()"));
log(solution("((())()"));
