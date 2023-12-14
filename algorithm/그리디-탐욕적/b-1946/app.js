const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [n, ...arr] = input;

function solution(a, b) {
  let line = 0;
  const result = [];
  let n = 0;
  for (let i = 0; i < a; i++) {
    n = Number(b[line++]);
    const scores = [];
    for (let j = 0; j < n; j++) {
      scores.push(b[line++].split(" ").map(Number));
    }
    scores.sort((a, b) => a[0] - b[0]);

    let count = 1;
    let minRank = scores[0][1];
    for (const [x, y] of scores) {
      if (y < minRank) {
        minRank = y;
        count++;
      }
    }
    result.push(count);
  }
  return result.join("\n");
}

console.log(solution(Number(n), arr));
