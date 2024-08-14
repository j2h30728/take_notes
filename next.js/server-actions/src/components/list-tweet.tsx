import Image from "next/image";
import Link from "next/link";

import { formatToTimeAgo, formatToWon } from "@/utils/utils";

interface ListTweetProps {
  title: string;
  price: number;
  created_at: Date;
  photo: string;
  id: number;
}

export default function ListTweet({ title, price, created_at, photo, id }: ListTweetProps) {
  return (
    <Link href={`/tweets/${id}`} className="flex gap-5">
      <div className="relative size-40 rounded-md overflow-hidden">
        <Image className="object-cover" fill src={`${photo}/middle`} alt={title} sizes="40" />
      </div>
      <div className="flex flex-col gap-1 *:text-stone-700">
        <span className="text-lg">{title}</span>
        <span className="text-sm text-stone-400">{formatToTimeAgo(created_at.toString())}</span>
        <span className="text-lg font-semibold">{formatToWon(price)}</span>
      </div>
    </Link>
  );
}
