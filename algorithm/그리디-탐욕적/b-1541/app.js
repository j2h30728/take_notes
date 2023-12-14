const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n")[0];

function solution(a) {
  const arr = a.split("-").map((x) => x.split("+").reduce((acc, cur) => acc + +cur, 0));
  return arr.slice(1).reduce((acc, curr) => acc - curr, arr[0]);
}

console.log(solution(input));
