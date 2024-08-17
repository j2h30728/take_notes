import Image from "next/image";
import Link from "next/link";

import { formatToTimeAgo } from "@/utils/utils";
import { PaginatedTweets } from "@/app/(tabs)/actions";

type TweetProps = PaginatedTweets[number];

export default function ListTweet({ id, photo, title, created_at, views, _count }: TweetProps) {
  return (
    <Link href={`/tweets/${id}`} className="flex gap-5">
      <div className="relative size-40 rounded-md overflow-hidden">
        <Image className="object-cover" fill src={`${photo}/middle`} alt={title} sizes="40" />
      </div>
      <div className="flex flex-col gap-1 *:text-stone-700">
        <span className="text-lg">{title}</span>
        <span className="text-sm text-stone-400">{formatToTimeAgo(created_at.toString())}</span>
        <span className="text-lg font-semibold">조회 {views}</span>
        <span className="text-lg font-semibold">{_count.comments}</span>
        <span className="text-lg font-semibold">{_count.likes}</span>
      </div>
    </Link>
  );
}
