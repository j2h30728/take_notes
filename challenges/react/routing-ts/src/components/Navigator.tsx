import { Link } from "react-router-dom";
import { BookItem } from "../data";
import { formatTextToParam } from "../utils";

interface ListData extends BookItem {
  href?: string;
}

export default function Navigator({ listData }: { listData: ListData[] }) {
  return listData.map((item) => (
    <li key={item.name}>
      <Link to={item.href ? item.href : formatTextToParam(item.name)}>{item.name}</Link>
    </li>
  ));
}
