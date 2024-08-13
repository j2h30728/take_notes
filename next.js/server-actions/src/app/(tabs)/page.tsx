import TweetList from "@/components/tweet-list";
import db from "@/utils/db";
import { Prisma } from "@prisma/client";

export default async function MainPage() {
  const tweets = await getInitialTweets();
  return (
    <div className="p-5 flex flex-col gap-5">
      <TweetList initialTweets={tweets} />
    </div>
  );
}
async function getInitialTweets() {
  const tweets = db.tweet.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    take: 3,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}
export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;
