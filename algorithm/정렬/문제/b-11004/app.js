const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n").slice(1);

function solution(arr) {
  return arr.sort((a, b) => a - b).join("\n");
}

console.log(solution(input.map(Number)));
