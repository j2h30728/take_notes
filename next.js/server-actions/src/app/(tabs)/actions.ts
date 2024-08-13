"use server";

import db from "@/utils/db";

const LIMIT_NUMBER = 3;
export async function getPaginatedTweets(page: number) {
  const tweets = db.tweet.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    skip: LIMIT_NUMBER * page,
    take: LIMIT_NUMBER,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}
