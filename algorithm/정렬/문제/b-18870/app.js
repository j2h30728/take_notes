const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [n, arr] = input;

function solution(a, b) {
  const map = new Map();
  Array.from(new Set(b))
    .sort((a, b) => a - b)
    .forEach((x, i) => map.set(x, i));

  return b.map((x) => map.get(x)).join(" ");
}

console.log(solution(Number(n), arr.split(" ").map(Number)));
