const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [n, ...arr] = input;

function solution(a, b) {
  return b
    .sort(([xA, yA], [xB, yB]) => {
      if (xA === xB) {
        return yA - yB;
      } else {
        return xA - xB;
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
