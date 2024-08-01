# 알고리즘과 문제 해결 패턴

## 목표

- 알고리즘의 정의 이해
- 알고리즘을 해결하기 위한 전략 수립
- 빈도 카운터, 다중 포인터, 슬라이딩 윈도우, 분할 정복 등의 문제 해결 패턴 비교 및 이해

## 알고리즘이란?

- 알고리즘은 특정 작업을 수행하기 위한 **명확한 단계나 절차의 집합**
- 프로그래밍에서 알고리즘은 데이터 처리, 계산, 자동화된 추론 등 다양한 작업을 수행하는 데 사용된다.

## 문제 해결 전략

### 1. 문제 이해

- 문제를 자신의 언어로 다시 설명
- 문제를 해결하기 위한 입력과 출력이 무엇인지 명확히 하기
- 입력에서 출력을 결정할 수 있는지 확인
- 문제의 핵심 데이터를 어떻게 정의할지 고민

### 2. 구체적인 예제 탐구

- 간단한 예제부터 시작하여 복잡한 예제로 발전하기
- 빈 입력 또는 잘못된 입력의 경우도 고려하기

### 3. 문제 나누기

- 문제를 더 작은 단계로 나누어 작성. 이는 코드를 작성하기 전에 전체 흐름을 파악하고 오류를 방지하는 데 도움을 준다.

### 4. 단순화

- 핵심 어려움을 식별하고, 일시적으로 무시한 후 단순화된 해결책을 작성. 그런 다음 어려움을 다시 포함시켜 문제를 해결.

### 5. 리팩터링

- 결과를 검토하고, 다른 방식으로 결과를 도출할 수 있는지, 코드가 명확하게 이해되는지 점검.
- 성능 개선 가능성, 재사용 가능성 등을 고려하여 코드를 개선하기.

## 문제 해결 패턴 및 솔루션

### 1. 빈도 카운터 (Frequency Counters)

이 패턴은 객체나 세트를 사용하여 값의 빈도를 수집합니다. 중첩 루프를 피하고 시간 복잡도를 줄이는 데 유용.

**예제 문제**: 두 배열이 같은 요소의 제곱값을 같은 빈도로 가지고 있는지 확인하기.

```javascript
function same(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  let frequencyCounter1 = {};
  let frequencyCounter2 = {};
  for (let val of arr1) {
    frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1;
  }
  for (let val of arr2) {
    frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1;
  }
  for (let key in frequencyCounter1) {
    if (!(key ** 2 in frequencyCounter2)) {
      return false;
    }
    if (frequencyCounter2[key ** 2] !== frequencyCounter1[key]) {
      return false;
    }
  }
  return true;
}
```

### 2. 다중 포인터

배열의 시작과 끝에서 시작하여 조건에 따라 포인터를 조작합니다. 이는 공간 복잡도를 최소화하면서 문제를 효율적으로 해결하는 데 유용.

**예제 문제**: 정렬된 배열에서 합이 0이 되는 첫 번째 쌍을 찾기.

```javascript
function sumZero(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    let sum = arr[left] + arr[right];
    if (sum === 0) {
      return [arr[left], arr[right]];
    } else if (sum > 0) {
      right--;
    } else {
      left++;
    }
  }
  return undefined;
}
```

### 3. 슬라이딩 윈도우

이 패턴은 배열이나 문자열에서 특정 범위 내의 부분 집합을 이동하며 최적값을 찾는 데 사용됨.

**예제 문제**: 주어진 배열에서 n개의 연속된 요소의 최대 합을 구하기.

```javascript
function maxSubarraySum(arr, num) {
  let maxSum = 0;
  let tempSum = 0;
  if (arr.length < num) return null;
  for (let i = 0; i < num; i++) {
    maxSum += arr[i];
  }
  tempSum = maxSum;
  for (let i = num; i < arr.length; i++) {
    tempSum = tempSum - arr[i - num] + arr[i];
    maxSum = Math.max(maxSum, tempSum);
  }
  return maxSum;
}
```

### 4. 분할 정복

데이터를 작은 조각으로 나누고 각각을 처리하여 결과를 합침. 이는 이진 검색과 같은 문제에서 시간 복잡도를 크게 줄이는 데 유용.

**예제 문제**: 정렬된 배열에서 주어진 값을 찾고 그 인덱스를 반환. 값이 없다면 -1을 반환.

```javascript
function search(array, val) {
  let min = 0;
  let max = array.length - 1;
  while (min <= max) {
    let middle = Math.floor((min + max) / 2);
    let currentElement = array[middle];
    if (currentElement < val) {
      min = middle + 1;
    } else if (currentElement > val) {
      max = middle - 1;
    } else {
      return middle;
    }
  }
  return -1;
}
```

### 5. 애너그램 (Anagrams)

두 문자열이 서로의 애너그램인지 확인. 애너그램은 다른 문자열의 문자를 재배열하여 만든 단어.

**예제 문제**: 두 문자열이 애너그램인지 여부를 확인.

```javascript
function validAnagram(str1, str2) {
  if (str1.length !== str2.length) {
    return false;
  }
  const lookup = {};
  for (let i = 0; i < str1.length; i++) {
    let letter = str1[i];
    lookup[letter] ? (lookup[letter] += 1) : (lookup[letter] = 1);
  }

  for (let i = 0; i < str2.length; i++) {
    let letter = str2[i];
    if (!lookup[letter]) {
      return false;
    } else {
      lookup[letter] -= 1;
    }
  }

  return true;
}
```

이 솔루션은 두 문자열의 길이가 동일한지 확인한 후, 첫 번째 문자열의 각 문자의 빈도를 기록하고 두 번째 문자열에서 해당 빈도를 차감하는 방식으로 동작. 최종적으로 모든 빈도가 0이 되면 두 문자열은 애너그램.

**시간 복잡도**: O(n)

## 결론

- 효과적인 문제 해결 접근 방식을 개발하는 것은 매우 중요
- 문제 해결 패턴을 이해하고 적용함으로써 복잡한 문제를 보다 효율적으로 해결할 수 있다.
- 이 과정은 코드 작성 전에 문제를 명확히 이해하고 계획을 세우는 데서 시작된다.
- 리팩터링과 성능 개선을 통해 최적화된 코드를 작성 할 수 있다.
