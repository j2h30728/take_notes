import { Outlet } from "react-router-dom";
import { getAllPublisherName } from "../data";
import { formatTextToParam } from "../utils";
import Navigator from "../components/Navigator";

export default function Home() {
  const publisherNames = getAllPublisherName().map((item) => ({
    name: item.name,
    href: `/author/${formatTextToParam(item.name)}`,
  }));

  return (
    <div>
      <h1>베스트 셀러 작가들</h1>
      <ul>
        <Navigator listData={publisherNames} />
      </ul>
      <Outlet />
    </div>
  );
}
