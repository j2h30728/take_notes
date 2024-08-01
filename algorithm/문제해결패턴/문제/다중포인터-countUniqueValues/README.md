# 다중 포인터 - countUniqueValues

### 분류

문제해결 패턴

### 문제 설명

정렬된 배열을 받아들이고 배열의 고유 값을 세는 countUniqueValues라는 함수를 구현합니다.
배열에 음수가 있을 수 있지만 항상 정렬됩니다.

예시:

```js
countUniqueValues([1, 1, 1, 1, 1, 2]); // 2
countUniqueValues([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13]); // 7
countUniqueValues([]); // 0
countUniqueValues([-2, -1, -1, 0, 1]); // 4
```

### 제한 사항

Time Complexity - O(n)

Space Complexity - O(n)

### 보너스

상수 또는 O(1) space 와 O(n) time으로만 이 작업을 수행해야 합니다.
