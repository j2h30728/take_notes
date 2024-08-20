import db from "@/utils/db";
import { getSession } from "@/utils/session";

export async function getAllTweets() {
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

export async function getTweetsByLoggedInUser() {
  const session = await getSession();
  const tweets = await db.tweet.findMany({
    where: {
      userId: session.id,
    },
    include: {
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}
