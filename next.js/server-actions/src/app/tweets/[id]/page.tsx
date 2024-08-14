import { getSession } from "@/utils/session";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { UserIcon } from "@heroicons/react/24/solid";
import db from "@/utils/db";
import { formatToWon } from "@/utils/utils";

async function getTweet(id: number) {
  const tweet = await db.tweet.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
  return tweet;
}
async function getIsAuthor(userId: number) {
  const session = await getSession();
  if (session.id) return session.id === userId;

  return false;
}

export default async function TweetDetail({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) return notFound();

  const tweet = await getTweet(id);
  if (!tweet) return notFound();
  const isAuthor = await getIsAuthor(tweet.userId);

  return (
    <div className="pb-36">
      <div className="relative aspect-square">
        <Image className="object-cover" fill src={`${tweet.photo}/public`} alt={tweet.title} />
      </div>
      <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
        <div className="size-10 rounded-full">
          {tweet.user.avatar !== null ? (
            <Image src={`${tweet.user.avatar}/avatar`} width={40} height={40} alt={tweet.user.username} />
          ) : (
            <UserIcon />
          )}
        </div>
        <div>
          <h3>{tweet.user.username}</h3>
        </div>
      </div>
      <div className="p-5">
        <h1 className="text-2xl font-semibold">{tweet.title}</h1>
        <p>{tweet.tweet}</p>
      </div>
      <div className="fixed w-full bottom-0 left-0 p-5 pb-10 bg-stone-200 flex justify-between items-center">
        <span className="font-semibold text-xl">{formatToWon(tweet.price)}원</span>
        {isAuthor ? (
          <button className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold">Delete tweet</button>
        ) : null}
        <Link className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold" href={``}>
          채팅하기
        </Link>
      </div>
    </div>
  );
}
