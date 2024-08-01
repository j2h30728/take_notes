function minSubArrayLen(arr, num) {
  let left = 0;
  let right = 0;
  let total = 0;
  let minLength = Infinity;

  while (left < arr.length) {
    if (total < num && right < arr.length) {
      total += arr[right];
      right++;
    } else if (total >= num) {
      minLength = Math.min(minLength, right - left);
      total -= arr[left];
      left++;
    } else {
      break;
    }
  }
  return minLength === Infinity ? 0 : minLength;
}
