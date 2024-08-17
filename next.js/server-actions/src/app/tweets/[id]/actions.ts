"use server";

import db from "@/utils/db";
import { commentSchema } from "@/utils/schema";
import { getSession } from "@/utils/session";
import { revalidateTag } from "next/cache";

export const likeTweet = async (tweetId: number) => {
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        userId: session.id!,
        tweetId,
      },
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch (error) {}
};

export const dislikeTweet = async (tweetId: number) => {
  const session = await getSession();
  try {
    await db.like.delete({
      where: {
        id: { userId: session.id!, tweetId },
      },
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch (error) {}
};

export const addTweetComment = async (formData: FormData) => {
  const text = formData.get("text");
  const tweetId = formData.get("tweetId");
  const result = commentSchema.safeParse(text);

  if (!result.success) {
    return result.error.flatten();
  }
  const session = await getSession();
  try {
    if (session.id) {
      await db.comment.create({
        data: {
          userId: session.id,
          tweetId: Number(tweetId),
          text: result.data,
        },
      });
    }
  } catch (error) {}
  revalidateTag(`tweet-comments-${tweetId}`);
};
export const deleteComment = async (commentId: number, tweetId: number) => {
  const session = await getSession();
  try {
    if (session.id) {
      await db.comment.delete({
        where: {
          id: commentId,
          userId: session.id,
        },
      });
    }
  } catch (error) {}
  revalidateTag(`tweet-comments-${tweetId}`);
};
