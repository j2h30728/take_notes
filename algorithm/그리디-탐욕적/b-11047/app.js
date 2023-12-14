const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [n, ...arr] = input;

function solution(a, b) {
  let [N, money] = a;
  let count = 0;
  for (let i = N; i >= 0; i--) {
    while (money / b[i] >= 1) {
      count += parseInt(money / b[i]);
      money = money % b[i];
    }
  }
  return count;
}

console.log(solution(n.split(" ").map(Number), arr.map(Number)));
