const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n")[0];

function solution(a) {
  let count = 0;
  while (a >= 0) {
    if (a === 0 || a % 5 === 0) {
      count += parseInt(a / 5);
      break;
    }
    a -= 3;
    count += 1;
  }

  return a >= 0 ? count : -1;
}

console.log(solution(Number(input)));
