const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n")[0];

function solution(a) {
  const count = Array.from({ length: 10 }, () => 0);
  for (const n of a) {
    count[n]++;
  }
  let result = "";
  for (let i = 9; i >= 0; i--) {
    result += `${i}`.repeat(count[i]);
  }
  return result;
}

console.log(solution(input));
