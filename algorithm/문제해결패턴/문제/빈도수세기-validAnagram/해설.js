function validAnagram(a, b) {
  // add whatever parameters you deem necessary - good luck!
  if (a.length !== b.length) return false;
  const obj = {};

  for (const char of a) {
    obj[char] = (obj[char] || 0) + 1;
  }

  for (const char of b) {
    if (!obj[char]) {
      return false;
    } else {
      obj[char] -= 1;
    }
  }
  return true;
}
validAnagram("", ""); // true
validAnagram("aaz", "zza"); // false
validAnagram("anagram", "nagaram"); // true
validAnagram("rat", "car"); // false) // false
validAnagram("awesome", "awesom"); // false
validAnagram("amanaplanacanalpanama", "acanalmanplanpamana"); // false
validAnagram("qwerty", "qeywrt"); // true
validAnagram("texttwisttime", "timetwisttext"); // true
