## #얕은복사와 깊은복사의 차이를 설명해주세요.

프로그래밍에서 변수는 메모리상의 주소에 연결된 이름입니다.

변수를 복사하는 것은 값의 타입에 따라 복사의 종류가 다르게 작동합니다.

원시 타입의 경우, 해당 변수가 참조하는 메모리 영역의 값을 새로운 메모리 영역에 복사하여 새로운 변수가 그 값을 참조하도록 만드는 것입니다.

객체와 배열과같은 참조 타입은 얕은 복사와 깊은 복사가 존재합니다.

얕은 복사는 원본 데이터 구조를 반영하는 새로운 데이터를 생성하지만, 내부 구조에 존재하는 참조형 타입값들은 참조하는 메모리 주소가 복사되어, 원본 객체와 복사된 객체가 동일한 값을 참조하게 됩니다. 이러한 얕은 복사는 `Object.assign()`과 spread 연산자 등의 방법으로 구현될 수 있습니다.

```jsx
// 얕은 복사의 예씨 코드
// 1. Object.assign()
function convertToJohn(person) {
  const newPerson = Object.assign({}, person);
  newPerson.name = "John";

  return newPerson;
}

const evan = { name: "Evan" };
const john = convertToJohn(evan);

console.log(evan); //{name: 'Evan'}
console.log(john); //{name: 'John'}

// 2. spread operator
function convertToJohn(person) {
  return {
    ...person,
    name: "John",
  };
}
```

반면, 깊은 복사는 원본 데이터의 내부 구조를 반영할 뿐만 아니라 내부 구조에 존재하는 참조형 데이터 타입의 값들 모두가 복사되어 원본 객체와 복사된 객체가 서로 다른 값을 참조하게 됩니다. 이는 재귀 함수를 사용해 내부에 존재하는 모든 참조형 타입들을 복사하거나 lodash 라이브러리에 존재하는 `cloneDeep()` 함수를 사용하기도 합니다.

```jsx
// 깊은 복사 예시 코드
const originalObj = {
  name: "John",
  address: {
    city: "New York",
    country: "USA",
  },
};

// lodash 라이브러리의 cloneDeep() 함수를 사용한 깊은 복사
const copiedObj = _.cloneDeep(originalObj);

// 참조형 데이터 타입의 값을 수정해도 원본 객체는 변하지 않음
copiedObj.address.city = "Los Angeles";

console.log(originalObj.address.city); // 'New York'
console.log(copiedObj.address.city); // 'Los Angeles'
```

위 예시 코드는 lodash 라이브러리의 **`cloneDeep()`** 함수를 사용해 객체를 깊은 복사하는 방법을 보여줍니다. 이 함수는 재귀적으로 객체의 내부 구조를 탐색하며, 참조형 데이터 타입을 모두 새로운 값으로 복사합니다. 따라서 **`copiedObj`** 객체의 **`address`** 속성 값을 수정해도 **`originalObj`** 객체는 변하지 않습니다.
