function maxSubarraySum(arr, num) {
  if (arr.length < num) return null;
  let max = 0;
  for (let i = 0; i < num; i++) {
    max += arr[i];
  }
  let temp = max;
  for (let i = num; i < arr.length; i++) {
    temp = temp - arr[i - num] + arr[i];
    max = Math.max(temp, max);
  }
  return max;
}
