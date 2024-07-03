import { Outlet, useParams } from "react-router-dom";
import Navigator from "../components/Navigator";
import { formatTextToString } from "../utils";

const detailNavigator = [{ name: "chapters" }, { name: "characters" }];

export default function BookDetail() {
  const { book } = useParams();
  return (
    <>
      <h1>{formatTextToString(book!)}</h1>
      <Navigator listData={detailNavigator} />
      <Outlet />
    </>
  );
}
