//areThereDuplicates 솔루션 (빈도 수 세기)
function areThereDuplicates() {
  let collection = {};
  for (let val in arguments) {
    collection[arguments[val]] = (collection[arguments[val]] || 0) + 1;
  }
  for (let key in collection) {
    if (collection[key] > 1) return true;
  }
  return false;
}

//areThereDuplicates 솔루션 (다중 포인터)
function areThereDuplicates(...args) {
  // Two pointers
  args.sort((a, b) => a > b);
  let start = 0;
  let next = 1;
  while (next < args.length) {
    if (args[start] === args[next]) {
      return true;
    }
    start++;
    next++;
  }
  return false;
}

//areThereDuplicates One Liner 솔루션
function areThereDuplicates() {
  return new Set(arguments).size !== arguments.length;
}
