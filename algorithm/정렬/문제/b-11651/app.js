const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [n, ...arr] = input;

function solution(a, b) {
  const set = new Set(b);
  return Array.from(set)
    .sort((a, b) => {
      if (a.length !== b.length) {
        return a.length - b.length;
      } else {
        if (a < b) {
          return -1;
        } else if (a > b) {
          return 1;
        } else {
          return 0;
        }
      }
    })
    .join("\n");
}

console.log(solution(Number(n), arr));
