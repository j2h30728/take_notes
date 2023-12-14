// 병합(merge) 수행 함수
function merge(arr, left, mid, right) {
  let i = left; // 첫 번째 하위 배열의 시작 인덱스
  let j = mid + 1; // 두 번째 하위 배열의 시작 인덱스
  let k = left; // 정렬된 배열의 인덱스 (결과)

  // 두 하위 배열을 순회하면서 각 요소를 비교하고 정렬된 배열에 병합
  while (i <= mid && j <= right) {
    if (arr[i] <= arr[j]) {
      // 첫 번째 배열의 요소가 두 번째 배열의 요소보다 작거나 같으면
      sorted[k++] = arr[i++]; // 첫 번째 배열의 요소를 정렬된 배열에 넣음
    } else {
      // 두 번째 배열의 요소가 더 작으면
      sorted[k++] = arr[j++]; // 두 번째 배열의 요소를 정렬된 배열에 넣음
    }
  }

  // 한 쪽 배열의 요소가 모두 병합되면 남은 다른 쪽 배열의 요소를 정렬된 배열에 추가
  if (i > mid) {
    for (; j <= right; j++) sorted[k++] = arr[j];
  } else {
    for (; i <= mid; i++) sorted[k++] = arr[i];
  }

  // 정렬된 배열의 요소를 원래 배열에 복사
  for (let x = left; x <= right; x++) {
    arr[x] = sorted[x];
  }
}

// 병합 정렬을 수행하는 함수
function mergeSort(arr, left, right) {
  if (left < right) {
    let mid = parseInt((left + right) / 2); // 중간점 계산
    mergeSort(arr, left, mid); // 첫 번째 부분 배열 정렬
    mergeSort(arr, mid + 1, right); // 두 번째 부분 배열 정렬
    merge(arr, left, mid, right); // 병합 수행
  }
}

// 배열 생성 및 병합 정렬 실행
const arr = Array.from({ length: 100000 }, () => Math.floor(Math.random() * 1000));
const sorted = Array.from({ length: arr.length }, () => 0);
mergeSort(arr, 0, arr.length - 1);
