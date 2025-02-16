// 1. 배열 정렬하기
const solution_1 = (arr) => arr.sort((a, b) => a - b);

console.log("solution_1 : ", solution_1([1, -5, 2, 4, 3]));
console.log("solution_1 : ", solution_1([2, 1, 1, 3, 2, 5, 4]));
console.log("solution_1 : ", solution_1([1, 6, 7]));

// 2. 배열 제어하기
const solution_2 = (arr) => Array.from(new Set(arr)).sort((a, b) => b - a);

console.log("solution_2 : ", solution_2([4, 2, 2, 1, 3, 4]));
console.log("solution_2 : ", solution_2([2, 1, 1, 3, 2, 5, 4]));

// 3. 두 수를 뽑아서 더하기
function solution_3(numbers) {
  const set = new Set();
  for (let i = 0; i < numbers.length - 1; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      set.add(numbers[i] + numbers[j]);
    }
  }
  return [...set].sort((a, b) => a - b);
}

console.log("solution_3 : ", solution_3([2, 1, 3, 4, 1]));
console.log("solution_3 : ", solution_3([5, 0, 2, 7]));

// 4. 모의고사

function solution_4(answers) {
  const patterns = [
    [1, 2, 3, 4, 5],
    [2, 1, 2, 3, 2, 4, 2, 5],
    [3, 3, 1, 1, 2, 2, 4, 4, 5, 5],
  ];

  const scores = [0, 0, 0];
  answers.map((answer, i) => {
    patterns.map((pattern, j) => {
      if (answer === pattern[i % pattern.length]) {
        scores[j] += 1;
      }
    });
  });
  const max = Math.max(...scores);
  const result = [];
  for (let i = 0; i < scores.length; i++) {
    if (max === scores[i]) {
      result.push(i + 1);
    }
  }
  return result;
}

console.log("solution_4 : ", solution_4([1, 2, 3, 4, 5]));
console.log("solution_4 : ", solution_4([1, 3, 2, 4, 2]));

// 5. 행렬의 곱셈
function solution_5(arr1, arr2) {
  const row1 = arr1.length; // 3
  const col1 = arr1[0].length; // 2

  const col2 = arr2[0].length; // 2

  // 2 * 3 (가로 2 , 세로 3)
  const result = [...new Array(row1)].map((_, i) => new Array(col2).fill(0));

  for (let i = 0; i < row1; i++) {
    for (let j = 0; j < col2; j++) {
      for (let k = 0; k < col1; k++) {
        result[i][j] += arr1[i][k] * arr2[k][j];
      }
    }
  }
  return result;
}
// 수작업으로.. 풀었습니다.

console.log(
  "solution_5 : ",
  solution_5(
    [
      [1, 4],
      [3, 2],
      [4, 1],
    ],
    [
      [3, 3],
      [3, 3],
    ]
  )
);
console.log(
  "solution_5 : ",
  solution_5(
    [
      [2, 3, 2],
      [4, 2, 4],
      [3, 1, 4],
    ],
    [
      [5, 4, 3],
      [2, 4, 1],
      [3, 1, 1],
    ]
  )
);

// 6. 실패율
function solution_6(N, stages) {
  const success = new Array(N + 1).fill(0);
  stages.forEach((stage) => {
    for (let i = 0; i < stage; i++) {
      success[i] += 1;
    }
  });
  const arr = [];
  let people = stages.length;
  for (let i = 0; i < success.length - 1; i++) {
    const failCount = success[i] - success[i + 1];
    arr.push(failCount / people);
    people -= failCount;
  }
  const result = Object.entries(arr)
    .sort((a, b) => b[1] - a[1])
    .map((x) => +x[0] + 1);
  return result;
}

/**
 * 다른 사람 풀이 참고
 * 
 * 
 function solution_6_1(N, stages) {
  const result = [];
  for (let i = 1; i <= N; i++) {
    const success = stages.filter((x) => x >= i).length;
    const cur = stages.filter((x) => x === i).length;
    result.push([i, cur / success]);
  }
  return result.sort((a, b) => b[1] - a[1]).map((x) => x[0]);
}
 */

console.log("solution_6 : ", solution_6(5, [2, 1, 2, 6, 2, 4, 3, 3]));
console.log("solution_6 : ", solution_6(4, [4, 4, 4, 4, 4]));

// 7. 방문 길이

const isValidMove = (x, y) => {
  if (x <= 5 && y <= 5 && x >= -5 && y >= -5) {
    return true;
  } else {
    return false;
  }
};
const updatePosition = (x, y, dir) => {
  switch (dir) {
    case "U":
      return [x, y + 1];
    case "D":
      return [x, y - 1];
    case "R":
      return [x + 1, y];
    case "L":
      return [x - 1, y];
  }
};
function solution_7(dirs) {
  const visitedSet = new Set();
  let x = 0;
  let y = 0;
  for (const dir of dirs) {
    const [nx, ny] = updatePosition(x, y, dir);
    if (!isValidMove(nx, ny)) {
      continue;
    }
    visitedSet.add(`${x},${y}-${nx},${ny}`);
    visitedSet.add(`${nx},${ny}-${x},${y}`);
    x = nx;
    y = ny;
  }
  return visitedSet.size / 2;
}
console.log("solution_7 : ", solution_7("ULURRDLLU"));
console.log("solution_7 : ", solution_7("LULLLLLLU"));
