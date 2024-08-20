import { Prisma } from "@prisma/client";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/solid";

import TweetList from "@/components/tweet-list";
import db from "@/utils/db";
import AddTweet from "@/components/upload-tweet-form";

export default async function MainPage() {
  const tweets = await getInitialTweets();

  return (
    <div className="p-5 flex flex-col gap-5 ">
      <AddTweet />
      <TweetList initialTweets={tweets} />
      <div className="max-w-screen-sm fixed bottom-24 mx-auto flex self-end">
        <Link
          href="/tweets/add"
          className="bg-rose-400 flex items-center justify-center rounded-full size-16 text-white transition-colors hover:bg-rose-300">
          <PlusIcon className="size-10" />
        </Link>
      </div>
    </div>
  );
}
async function getInitialTweets() {
  const tweets = await db.tweet.findMany({
    include: {
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
    take: 2,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}
export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;
