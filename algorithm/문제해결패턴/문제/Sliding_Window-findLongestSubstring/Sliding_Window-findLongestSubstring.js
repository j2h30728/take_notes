function findLongestSubstring(string) {
  let maxLength = 0;
  let result = "";
  for (let right = 0; right < string.length; right++) {
    const index = result.indexOf(string[right]);
    if (index === -1) {
      result += string[right];
    } else {
      maxLength = Math.max(maxLength, result.length);
      result = result.slice(index + 1) + string[right];
    }
  }
  return Math.max(maxLength, result.length);
}
