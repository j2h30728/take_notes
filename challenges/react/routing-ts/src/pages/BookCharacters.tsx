import { useParams } from "react-router-dom";
import { getPublisherDataByName } from "../data";
import { formatTextToString } from "../utils";
import List from "../components/List";

export default function BookCharacters() {
  const { book, name } = useParams();
  const authorData = getPublisherDataByName(formatTextToString(name!));
  const bookData = authorData[0].books.find((bookData) => bookData.name === formatTextToString(book!));
  return (
    <>
      <h2>Characters</h2>
      <List listData={bookData?.characters ?? []} />
    </>
  );
}
