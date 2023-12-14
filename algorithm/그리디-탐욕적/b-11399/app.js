const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [n, arr] = input;

function solution(a, b) {
  let result = 0;
  let summary = 0;

  b.sort((a, b) => a - b);
  for (let i = 0; i < a; i++) {
    summary += b[i];
    result += summary;
  }
  return result;
}

console.log(solution(Number(n), arr.split(" ").map(Number)));
