/**
 * 타입스크립트의 클래스를 이용하여 Dict (사전. dictionary) 클래스를 만드세요. Dict 클래스는 아래와 같은 메소드들을 갖고 있어야 합니다.

add: 단어를 추가함.
get: 단어의 정의를 리턴함.
delete: 단어를 삭제함.
update: 단어를 업데이트 함.
showAll: 사전 단어를 모두 보여줌.
count: 사전 단어들의 총 갯수를 리턴함.
upsert 단어를 업데이트 함. 존재하지 않을시. 이를 추가함. (update + insert = upsert)
exists: 해당 단어가 사전에 존재하는지 여부를 알려줌.
bulkAdd: 다음과 같은 방식으로. 여러개의 단어를 한번에 추가할 수 있게 해줌. [{term:"김치", definition:"대박이네~"}, {term:"아파트", definition:"비싸네~"}]
bulkDelete: 다음과 같은 방식으로. 여러개의 단어를 한번에 삭제할 수 있게 해줌. ["김치", "아파트"]
 * 
 */

type Words = {
  [key: string]: string;
};
type Word = { term: string; definition: string };

class Dictionary {
  private words: Words;
  constructor() {
    this.words = {};
  }

  add({ term, definition }: Word) {
    if (!this.words[term]) {
      this.words[term] = definition;
    }
  }
  get(term: string) {
    return this.words[term];
  }
  delete(term: string) {
    delete this.words[term];
  }
  update({ term, definition }: Word) {
    if (this.get(term)) {
      this.words[term] = definition;
    }
  }
  showAll() {
    const entryWords = Object.keys(this.words)
      .map((term) => `${term}: ${this.words[term]}`)
      .join("\n");
    console.log(entryWords);
    return entryWords;
  }
  count() {
    return Object.keys(this.words).length;
  }
  upsert({ term, definition }: Word) {
    this.words[term] = definition;
  }
  exists(term: string) {
    return this.words.hasOwnProperty(term);
  }
  bulkAdd(wordsArray: Word[]) {
    wordsArray.forEach((word) => {
      if (this.get(word.term)) {
        return this.update(word);
      }
      return this.add(word);
    });
  }
  bulkDelete(wordsArray: (Word | string)[]) {
    wordsArray.forEach((word) => {
      if (typeof word === "string") {
        return this.delete(word);
      }
      return this.delete(word.term);
    });
  }
}

export {};
