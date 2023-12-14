const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n")[0];

function solution(a) {
  let sum = 0;
  let current = 0;
  while (a >= sum) {
    current += 1;
    sum += current;
  }
  return current - 1;
}

console.log(solution(Number(input)));
