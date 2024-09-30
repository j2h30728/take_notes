const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

function solution(x) {
  const n = x[0];
  const arr = x[1].split(" ").map(Number);
  const m = x[2];

  let start = 1;
  let end = arr.reduce((a, b) => Math.max(a, b));

  let result = 0;
  while (start <= end) {
    let mid = parseInt((start + end) / 2);
    let total = 0;
    for (x of arr) {
      total += Math.min(x, mid);
    }
    if (total <= m) {
      result = mid;
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return result;
}

console.log(solution(input));
