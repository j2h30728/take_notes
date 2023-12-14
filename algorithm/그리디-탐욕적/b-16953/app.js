const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n")[0].split(" ");

function solution(a) {
  let [A, B] = a;
  let count = 0;
  while (A < B) {
    if (B % 2 === 0) {
      B = parseInt(B / 2);
    } else if (B % 10 === 1) {
      B = parseInt(B / 10);
    } else {
      return -1;
    }
    count += 1;
  }
  return A === B ? count + 1 : -1;
}

console.log(solution(input.map(Number)));
