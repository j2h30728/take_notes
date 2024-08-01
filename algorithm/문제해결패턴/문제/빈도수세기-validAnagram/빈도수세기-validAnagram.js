function validAnagram(a, b) {
  // add whatever parameters you deem necessary - good luck!
  if (a.length !== b.length) return false;
  const objA = {};
  const objB = {};
  for (const char of a) {
    objA[char] = (objA[char] || 0) + 1;
  }
  for (const char of b) {
    objB[char] = (objB[char] || 0) + 1;
  }
  for (const key in objA) {
    if (!(key in objB)) return false;
    if (objA[key] !== objB[key]) return false;
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
