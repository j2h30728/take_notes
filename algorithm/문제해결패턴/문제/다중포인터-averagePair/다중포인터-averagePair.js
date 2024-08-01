function averagePair(arr, num) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    let average = (arr[left] + arr[right]) / 2;
    if (average === num) {
      return true;
    } else if (average < num) left++;
    else right--;
  }
  return false;
}
/*
다중 포인터 - averagePair
averagePair라는 함수를 작성하십시오. 
정렬된 정수 배열과 목표 평균이 주어지면 쌍의 평균이 목표 평균과 동일한 값 쌍이 배열에 있는지 확인합니다.
평균 목표와 일치하는 쌍이 둘 이상 있을 수 있습니다.

보너스 제약:
시간: O(N)
공간: O(1)
*/

//ReferenceError: Can't find variable: acc in file:///eval/src/index.js (line 5)
/**
 * 
 * Expected false to be true.
Expected false to be true.

 */
