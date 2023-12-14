const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [n, ...arr] = input;

function solution(a, b) {
  return b
    .sort(([xA, yA], [xB, yB]) => {
      if (yA === yB) {
        return xA - xB;
      } else {
        return yA - yB;
      }
    })
    .map((x) => x.join(" "))
    .join("\n");
}

console.log(
  solution(
    Number(n),
    arr.map((x) => x.split(" ").map(Number))
  )
);
