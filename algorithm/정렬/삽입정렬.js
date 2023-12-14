function insertionSort(arr) {
  // 배열의 두 번째 요소부터 시작하여 배열의 끝까지 순회
  for (let i = 1; i < arr.length; i++) {
    // 현재 요소를 정렬된 배열 부분과 비교
    for (let j = i; j > 0; j--) {
      // 현재 요소가 이전 요소보다 작으면 위치를 교환
      if (arr[j] < arr[j - 1]) {
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      } else {
        // 이미 정렬된 부분에서 자기보다 작은 요소를 만나면 반복을 멈춤
        break;
      }
    }
  }
}
/*----------------------------------------------------*/
let arr = Array.from({ length: 3000 }, () => Math.floor(Math.random() * 1000));
insertionSort(arr);
