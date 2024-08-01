function isSubsequence(str1, str2) {
  let left = 0;
  for (let char of str2) {
    if (char === str1[left]) {
      left++;
    }
  }
  return left === str1.length;
}
