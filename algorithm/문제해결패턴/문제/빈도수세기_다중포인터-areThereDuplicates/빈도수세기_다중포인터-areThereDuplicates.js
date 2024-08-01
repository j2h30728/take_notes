function areThereDuplicates(...arr) {
  const obj = {};
  for (const char of arr) {
    if (!obj[char]) {
      obj[char] = true;
    } else {
      return true;
    }
  }
  return false;
}
