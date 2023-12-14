// 정렬된 배열에서 특정 타겟 값을 찾기 위한 이진 탐색을 수행하는 함수 정의
function binarySearch(arr, target, start, end) {
  // 기본 조건: 시작 인덱스가 종료 인덱스보다 크면,
  // 이는 탐색 범위가 더 이상 없음을 의미하므로 타겟이 배열에 없다는 -1을 반환
  if (start > end) return -1;

  // 중간 인덱스 계산: 현재 탐색 범위의 중간 지점을 찾기 위해 시작 인덱스와 종료 인덱스의 평균을 계산
  let mid = parseInt((start + end) / 2);

  // 중간 요소 확인: 현재 중간 인덱스의 요소가 타겟 값과 동일한지 확인
  if (arr[mid] === target)
    // 타겟을 찾은 경우, 해당 인덱스 반환
    return mid;
  else if (arr[mid] > target)
    // 중간 값이 타겟보다 크면, 타겟은 중간 값의 왼쪽 부분에 있을 것이므로
    // 시작 인덱스는 그대로 두고, 종료 인덱스를 중간 인덱스보다 하나 작게 하여 왼쪽 부분을 다시 탐색
    return binarySearch(arr, target, start, mid - 1);
  // 중간 값이 타겟보다 작으면, 타겟은 중간 값의 오른쪽 부분에 있을 것이므로
  // 종료 인덱스는 그대로 두고, 시작 인덱스를 중간 인덱스보다 하나 크게 하여 오른쪽 부분을 다시 탐색
  else return binarySearch(arr, target, mid + 1, end);
}

let target = 7;
const arr = [1, 4, 6, 7, 8, 14, 36, 58];
let n = arr.length;

let result = binarySearch(arr, target, 0, n - 1);

if (result == -1) console.log("원소가 존재하지 않습니다.");
else console.log(`${result + 1}번째 원소입니다.`);
