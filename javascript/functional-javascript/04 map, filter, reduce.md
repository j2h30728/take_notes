## map, filter, reduce

```js
const log = console.log;

const products = [
  { name: "반팔티", price: 15000 },
  { name: "긴팔티", price: 20000 },
  { name: "핸드폰케이스", price: 15000 },
  { name: "후드티", price: 30000 },
  { name: "바지", price: 25000 },
];
```

## map

```js
const map = (f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
};

// let names = [];
// for (const p of products) {
//   names.push(p.name);
// }
// log(names);

log(map((p) => p.name, products));

// let prices = [];
// for (const p of products) {
//   prices.push(p.price);
// }
// log(prices);

log(map((p) => p.price, products));
```

## 이터러블 프로토콜을 따른 map의 다형성

```js
log([1, 2, 3].map((a) => a + 1)); // [2, 3, 4]

// document.querySelectorAll('*').map(el => el.nodeName); // Error
// console.log(document.querySelectorAll('*').map); // undefined => 순회 가능할 것 같으나 map 메서드가 없음

const it = document.querySelectorAll("*")[Symbol.iterator]();
console.log(it); // ArrayIterator{}

/**
 * document.querySelectorAll('*')는 이터러블 프로토콜을 따르고 있고,
 * 위에서 생성한 map 함수는 이터러블 프로토콜을 따르는 for-of 구문을 사용하기 때문에 순회 가능
 */
log(map((el) => el.nodeName, document.querySelectorAll("*"))); // ['HTML', 'HEAD', 'META', ...]

function* gen() {
  yield 2;
  if (false) yield 3;
  yield 4;
}

log(map((a) => a * a, gen())); // [4, 16]

let m = new Map();
m.set("a", 10);
m.set("b", 20);
console.log(m); // Map { 'a' => 10, 'b' => 20 }
log(new Map(map(([k, a]) => [k, a * 2], m))); // Map { 'a' => 20, 'b' => 40 } => 값에 2를 곱하게 됨

console.clear();
```

#### `document.querySelectorAll('*')`

- NodeList 객체를 반환
- NodeList는 이터러블이지만, 이터레이터는 아니다.
- 이는 NodeList 객체가 `[Symbol.iterator]()` 메서드를 가지고 있어서 이터러블 프로토콜을 따르지만, 그 메서드가 새로운 이터레이터 객체를 반환한다.
  - `iter[Symbol.iterator]() === iter`는 false를 반환
  - `iter[Symbol.iterator]()`가 새로운 이터레이터 객체를 반환하고, 그 이터레이터 객체는 iter와 다름
- `document.querySelectorAll('*').map` : undefined
  - documentQuerySelector은 Array에 상속받은 객체가 아니기 때문에 프로토타입에 연결되어 있지않음

```js
const test = document.querySelectorAll("*");
const iterator = test[Symbol.iterator]();

console.log(test === iterator); // false
console.log(iterator); // 이터레이터 객체
console.log(iterator.next()); // { value: <첫 번째 요소>, done: false }
console.log(iterator.next()); // { value: <두 번째 요소>, done: false }
```

## filter

```js
const filter = (f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
};

// let under20000 = [];
// for (const p of products) {
//   if (p.price < 20000) under20000.push(p);
// }
// log(...under20000);

log(...filter((p) => p.price < 20000, products));

// let over20000 = [];
// for (const p of products) {
//   if (p.price >= 20000) over20000.push(p);
// }
// log(...over20000);

log(...filter((p) => p.price >= 20000, products));

log(filter((n) => n % 2, [1, 2, 3, 4])); // [1, 3]

log(
  filter(
    (n) => n % 2,
    (function* () {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
      yield 5;
    })()
  )
); // [1, 3, 5]

console.clear();
```

## reduce

```js
const nums = [1, 2, 3, 4, 5];

// let total = 0;
// for (const n of nums) {
//   total = total + n;
// }
// log(total);

const reduce = (f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    // 1번째 값으로 초기화
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
};

const add = (a, b) => a + b;

log(reduce(add, 0, [1, 2, 3, 4, 5]));
// 15

log(add(add(add(add(add(0, 1), 2), 3), 4), 5));
// 15

log(reduce(add, [1, 2, 3, 4, 5]));
// 15

// console.clear();
```

```js
/**
 * acc 가 처음에 0으로 설정되고
 * acc = (0, product.price) => 0 + product.price 로 설정되며 값이 누적된다
 */
log(reduce((total_price, product) => total_price + product.price, 0, products));
```

```js
const products = [
  { name: "반팔티", price: 15000 },
  { name: "긴팔티", price: 20000 },
  { name: "핸드폰케이스", price: 15000 },
  { name: "후드티", price: 30000 },
  { name: "바지", price: 25000 },
];

const add = (a, b) => a + b;

// price가 20000 미만인 상품들의 가격 총합
log(
  reduce(
    add,
    map(
      (p) => p.price,
      filter((p) => p.price < 20000, products)
    )
  )
);

// price가 20000 이상인 상품들의 가격 총합
log(
  reduce(
    add,
    filter(
      (n) => n >= 20000,
      map((p) => p.price, products)
    )
  )
);
```

## fx

```js
const log = console.log;

const map = (f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
};

const filter = (f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
};

const reduce = (f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
};
```
