// 비재귀적 방법을 사용하는 이진 탐색 함수
function binarySearch(arr, target, start, end) {
  // start가 end보다 작거나 같을 때까지 반복 (탐색 범위가 남아있는 동안)
  while (start <= end) {
    // 중간 지점 계산
    let mid = parseInt((start + end) / 2);

    // 중간 지점의 값이 타겟과 일치하는지 확인
    if (arr[mid] === target)
      // 타겟을 찾은 경우, 해당 인덱스 반환
      return mid;
    else if (arr[mid] > target)
      // 중간 값이 타겟보다 크면, 타겟은 중간 값의 왼쪽 부분에 위치
      // 따라서 종료 인덱스를 중간 인덱스 바로 앞으로 이동
      end = mid - 1;
    // 중간 값이 타겟보다 작으면, 타겟은 중간 값의 오른쪽 부분에 위치
    // 따라서 시작 인덱스를 중간 인덱스 바로 뒤로 이동
    else start = mid + 1;
  }
  // 반복문을 벗어난 경우 타겟이 배열에 없음을 의미, -1 반환
  return -1;
}

let target = 7;
const arr = [1, 4, 6, 7, 8, 14, 36, 58];
let n = arr.length;

let result = binarySearch(arr, target, 0, n - 1);

if (result == -1) console.log("원소가 존재하지 않습니다.");
else console.log(`${result + 1}번째 원소입니다.`);
