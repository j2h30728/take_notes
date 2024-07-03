import { BookItem } from "../data";

export default function List({ listData }: { listData: BookItem[] }) {
  return listData.map((item) => <li key={item.name}>{item.name}</li>);
}
