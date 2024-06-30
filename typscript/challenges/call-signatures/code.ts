/**
 * 현재까지 배운 것을 토대로, 아래 함수들에 대한 구현과 함께 호출 시그니처(call signatures) 를 작성해주세요
 */

//last(arr): 이 함수는 배열의 마지막 요소를 반환해야 합니다.
type Last = { <T>(arr: T[]): T };

const last: Last = (arr) => arr[arr.length - 1];
const lastResult = last([1, 2, 3, 4, 5, 200]);
console.log(lastResult); // 200

//prepend(arr, item): 이 함수는 배열의 시작 부분에 item을 넣고 return해야 합니다.
type Prepend = { <T, F = T>(arr: T[], item: F): (T | F)[] };
const prepend: Prepend = (arr, item) => [item, ...arr];
console.log(prepend(["1", "2", "3"], 1)); //[ 1, '1', '2', '3' ]

//mix(arr,arr) : 두개의 배열을 매개변수로 받아, 매개변수로 받은 두 배열을 하나의 배열로 섞어서 하나의 배열로 반환합니다.
type Mix = { <T, F = T>(arr1: T[], arr2: F[]): (T | F)[] };
const mixNumberArrays: Mix = (arr1, arr2) => [...arr1, ...arr2];
console.log(mixNumberArrays([1, 2, 3], [4, 5, 6])); //[ 1, 2, 3, 4, 5, 6 ]

//count(arr) : 배열을 매개변수로 받아, 매개변수로 받아온 배열의 길이를 반환하면됩니다.
type Count = { <T = unknown>(arr: T[]): number };
const count: Count = (arr) => arr.length;
console.log(count([1, 2, 3, 4, 5]));

//findIndex(arr, item) :
//첫번째 매개변수로 배열을, 두번째 매개변수로 받아온 item이 첫번째 매개변수 arr배열의 몇번째 index로 존재하는지 체크한후 존재한다면
// 몇번째 index인지 반환하고 존재하지않는다면 null을 반환합니다.
type FindIndex = { <T = unknown>(arr: T[], item: T): null | number };
const findIndex: FindIndex = (arr, item) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === item) {
      return i;
    }
  }
  return null;
};

console.log(findIndex(["a", "b", "c", "d"], "b"));

//slice(arr, startIndex, endIndex):
//첫번째 매개변수로 배열 arr을 받고, 두번째 매개변수로 숫자 startIndex, 세번째 매개변수 숫자 endIndex를 받습니다.
//첫번째 매개변수 arr을 두번째 매개변수로 받은 startIndex부터 세번째 매개변수로 받은 인덱스까지 자른 결과를 반환하면됩니다.
//이때 세번째 매개변수는 필수 매개변수가 아닙니다.
type Slice = { <T>(arr: T[], startIndex: number, endIndex?: number): T[] };
const slice: Slice = (arr, startIndex, endIndex = arr.length) => {
  const result: typeof arr = [];
  for (let i = startIndex; i < endIndex; i++) {
    result.push(arr[i]);
  }
  return result;
};
console.log(slice(["a", "b", "c", "d"], 2));

export {};
