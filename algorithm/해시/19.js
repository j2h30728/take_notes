/**
 * 문자열 해싱을 이용한 검색 함수 만들기
 * @param {string[]} stringList
 * @param {string[]} queryList
 * @returns {boolean}
 */
function solution(stringList, queryList) {
  const set = new Set(stringList);

  return queryList.map((x) => set.has(x));
}

const log = console.log;

log(solution(["apple", "banana", "cherry"], ["banana", "kiwi", "melon", "apple"]));
