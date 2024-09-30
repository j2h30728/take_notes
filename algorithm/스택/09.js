/**
 * 10진수를 2진수로 변환하기
 * @param {number} decimal - 10진수
 * @returns {number} - 2진수
 */
function solution(decimal) {
  const stack = [];
  while (decimal > 0) {
    const remainder = decimal % 2;
    stack.push(remainder);
    decimal = Math.floor(decimal / 2);
  }
  return stack.reverse().join("");
}
const log = console.log;

log(solution(10));
log(solution(27));
log(solution(12345));
