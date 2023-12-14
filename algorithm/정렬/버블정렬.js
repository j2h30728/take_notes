function bubbleSort(arr) {
  // 배열의 마지막 요소부터 시작하여 처음 요소까지 반복
  for (let i = arr.length - 1; i > 0; i--) {
    // i는 각 반복마다 정렬이 완료된 배열의 부분을 나타냄

    // 배열의 시작부터 i까지 순회
    for (let j = 0; j < i; j++) {
      // 인접한 요소를 비교하여, 필요한 경우 위치를 바꿈 (내림차순 정렬)
      if (arr[j] < arr[j + 1]) {
        // 현재 요소가 다음 요소보다 작으면 위치를 교환
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
}

/*----------------------------------------------------*/
let arr = Array.from({ length: 3000 }, () => Math.floor(Math.random() * 1000));
bubbleSort(arr);
