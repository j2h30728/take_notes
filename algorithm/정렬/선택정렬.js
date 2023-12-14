function selectionSort(arr) {
  // 배열의 모든 요소를 순회
  for (let i = 0; i < arr.length; i++) {
    // 초기에 현재 위치를 최소값의 위치로 설정
    let minIndex = i;

    // 현재 위치(i) 다음 요소부터 배열의 끝까지 순회
    for (let j = i + 1; j < arr.length; j++) {
      // 현재 최소값보다 더 작은 값을 찾으면, 그 위치를 minIndex로 업데이트
      if (arr[minIndex] > arr[j]) {
        minIndex = j;
      }
    }

    // 찾은 최소값의 위치(minIndex)가 현재 위치(i)와 다르면 요소의 위치를 교환
    // 구조 분해 할당을 사용하여 교환을 간결하게 수행
    if (i !== minIndex) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
}

/*----------------------------------------------------*/
let arr = Array.from({ length: 3000 }, () => Math.floor(Math.random() * 1000));
selectionSort(arr);
