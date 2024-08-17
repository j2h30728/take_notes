"use server";

import db from "@/utils/db";
import { Prisma } from "@prisma/client";

const LIMIT_NUMBER = 2;
export async function getTweetsByPage(page: number) {
  const tweets = await db.tweet.findMany({
    include: {
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
    skip: LIMIT_NUMBER * (page - 1),
    take: LIMIT_NUMBER,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}

export async function getTweetTotalCount() {
  return db.tweet.count();
}

export async function getPaginatedTweets(page: number) {
  const tweets = await getTweetsByPage(page);
  const TWEETS_TOTAL_COUNT = await getTweetTotalCount();

  const isLastPage = TWEETS_TOTAL_COUNT <= LIMIT_NUMBER * page;
  return { tweets, isLastPage };
}
export type PaginatedTweets = Prisma.PromiseReturnType<typeof getTweetsByPage>;
