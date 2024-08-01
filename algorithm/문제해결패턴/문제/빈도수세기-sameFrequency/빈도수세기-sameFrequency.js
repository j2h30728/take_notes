function sameFrequency(a, b) {
  const stringA = a.toString();
  const stringB = b.toString();
  if (stringA.length !== stringB.length) return false;
  const obj = {};
  for (const char of stringA) {
    obj[char] = (obj[char] || 0) + 1;
  }
  for (const char of stringB) {
    if (!obj[char]) {
      return false;
    } else {
      obj[char] -= 1;
    }
  }
  return true;
}
