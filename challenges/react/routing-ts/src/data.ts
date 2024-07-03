export interface BookItem {
  name: string;
}

interface Publisher {
  name: string;
  books: {
    name: string;
    chapters: BookItem[];
    characters: BookItem[];
  }[];
}

export const publisherData: Publisher[] = [
  {
    name: "J. K. Rowling",
    books: [
      {
        name: "Harry Potter 1",
        chapters: [
          { name: "Chapter 1" },
          { name: "Chapter 2" },
          { name: "Chapter 3" },
          { name: "Chapter 4" },
          { name: "Chapter 5" },
        ],
        characters: [{ name: "Good Guy A" }, { name: "Good Guy B" }, { name: "Bad Guy A" }, { name: "Bad Guy B" }],
      },
      {
        name: "Harry Potter 2",
        chapters: [
          { name: "Chapter 1" },
          { name: "Chapter 2" },
          { name: "Chapter 3" },
          { name: "Chapter 4" },
          { name: "Chapter 5" },
        ],
        characters: [{ name: "Good Guy A" }, { name: "Good Guy B" }, { name: "Bad Guy A" }, { name: "Bad Guy B" }],
      },
    ],
  },
  {
    name: "J. R. Tolkien",
    books: [
      {
        name: "Lord of The Rings 1",
        chapters: [
          { name: "Chapter 1" },
          { name: "Chapter 2" },
          { name: "Chapter 3" },
          { name: "Chapter 4" },
          { name: "Chapter 5" },
        ],
        characters: [{ name: "Good Guy A" }, { name: "Good Guy B" }, { name: "Bad Guy A" }, { name: "Bad Guy B" }],
      },
      {
        name: "Lord of The Rings 2",
        chapters: [
          { name: "Chapter 1" },
          { name: "Chapter 2" },
          { name: "Chapter 3" },
          { name: "Chapter 4" },
          { name: "Chapter 5" },
        ],
        characters: [{ name: "Good Guy A" }, { name: "Good Guy B" }, { name: "Bad Guy A" }, { name: "Bad Guy B" }],
      },
    ],
  },
];

export const getAllPublisherData = () => publisherData;

export const getAllPublisherName = () => publisherData.map((data) => ({ name: data.name }));

export const getPublisherDataByName = (name: string) => publisherData.filter((data) => data.name === name);
