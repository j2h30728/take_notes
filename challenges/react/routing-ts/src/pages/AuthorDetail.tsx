import { Outlet, useParams } from "react-router-dom";
import Navigator from "../components/Navigator";
import { getPublisherDataByName } from "../data";
import { formatTextToString } from "../utils";

export default function AuthorDetail() {
  const { name } = useParams();
  const authorData = getPublisherDataByName(formatTextToString(name!));
  return (
    <>
      <h1>{name}</h1>
      <Navigator listData={authorData[0].books} />
      <Outlet />
    </>
  );
}
