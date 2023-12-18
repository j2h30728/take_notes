const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n")[0].split(" ").map(Number);

const numbers = [];
const result = [];

function possible(x) {
  if (numbers.indexOf(x) !== -1) return false;
  return true;
}

function solution(x) {
  const [N, M] = x;
  function dfs(num) {
    for (let i = 1; i <= N; i++) {
      if (!possible(i) || numbers.length === M) continue;
      numbers.push(i);
      if (numbers.length === M) result.push(numbers.join(" "));
      dfs(num + 1);
      numbers.pop();
    }
  }
  dfs(1);
  return result.join("\n");
}

console.log(solution(input));
