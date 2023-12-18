const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [a, ...b] = input;
const A = a.split(" ").map(Number);
const B = b.map(Number);

function solution(x, arr) {
  const M = x[1];
  let start = 1;
  let end = Math.max(...arr);

  let result = 0;
  while (start <= end) {
    let mid = parseInt((start + end) / 2);
    let total = arr.reduce((acc, cur) => acc + parseInt(cur / mid), 0);

    if (total >= M) {
      result = mid;
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return result;
}

console.log(solution(A, B));
