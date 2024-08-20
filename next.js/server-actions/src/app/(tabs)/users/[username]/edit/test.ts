// export const isPromise = <T>(promise: Promise<T> | T): promise is Promise<T> => {
//   if (promise instanceof Promise) {
//     return true;
//   }

//   if (
//     promise !== null &&
//     typeof promise === "object" &&
//     "then" in promise &&
//     typeof promise.then === "function" &&
//     "catch" in promise &&
//     typeof promise.catch === "function"
//   ) {
//     return true;
//   }
//   return false;
// };
export const isPromise = <T>(value: Promise<T> | T) => {
  // 잘못된 구현: 'then'과 'catch'가 있는 객체를 Promise로 잘못 식별할 수 있습니다.
  return value !== null && typeof value === "object" && "then" in value && "catch" in value;
};

const processValue = async <T>(value: T | Promise<T>) => {
  if (isPromise(value)) {
    value;
    // 여기서 `value`는 `Promise<T>`로 추론됩니다.
    const result = await value;
    console.log("Processed promise result:", result);
  } else {
    // 여기서 `value`는 `T`로 추론됩니다.
    console.log("Processed non-promise value:", value);
  }
};
