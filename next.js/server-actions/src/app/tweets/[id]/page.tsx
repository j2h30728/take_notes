import { getSession } from "@/utils/session";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { EyeIcon } from "@heroicons/react/24/solid";
import db from "@/utils/db";
import { unstable_cache } from "next/cache";
import LikeButton from "@/components/like-button";
import { Prisma } from "@prisma/client";
import Comments from "@/components/comments";
import { getUserInfoBySession } from "@/service/userService";
import UserImage from "@/components/user-image";
import AiComment from "@/components/ai-comment";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getTweet(Number(params.id));
  return {
    title: product?.title,
  };
}

async function getTweet(id: number) {
  const tweet = await db.tweet.update({
    where: {
      id,
    },
    data: {
      views: {
        increment: 1,
      },
    },
    include: {
      _count: {
        select: {
          comments: true,
        },
      },
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
async function getLikeStatus(tweetId: number, userId: number) {
  const like = await db.like.findUnique({
    where: {
      id: {
        userId,
        tweetId,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      tweetId,
    },
  });
  return {
    isLiked: Boolean(like),
    likeCount,
  };
}

async function getInitialComments(tweetId: number, userId: number) {
  const comments = await db.comment.findMany({
    where: {
      tweetId,
    },
    select: {
      id: true,
      text: true,
      created_at: true,
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
  return comments.map((comment) => ({ ...comment, isAuthor: comment.user.id === userId }));
}
export type InitialComments = Prisma.PromiseReturnType<typeof getInitialComments>;

function getCachedTweetDetail(tweetId: number) {
  const cachedTweetDetail = unstable_cache(getTweet, ["tweet-detail"], {
    tags: [`like-detail-${tweetId}`],
  });
  return cachedTweetDetail(tweetId);
}

async function getCachedLikeStatus(tweetId: number) {
  const session = await getSession();
  const cachedLikeStatus = unstable_cache(getLikeStatus, ["tweet-like-status"], {
    tags: [`like-status-${tweetId}`],
  });
  return cachedLikeStatus(tweetId, session.id!);
}

async function getCachedComments(tweetId: number) {
  const session = await getSession();
  const cachedComments = unstable_cache(getInitialComments, ["tweet-comments"], {
    tags: [`tweet-comments-${tweetId}`],
  });
  return cachedComments(tweetId, session.id!);
}

async function getIsAuthor(userId: number) {
  const session = await getSession();
  if (session.id) return session.id === userId;

  return false;
}

export default async function TweetDetail({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) return notFound();
  const loggedInUser = await getUserInfoBySession();
  const tweet = await getCachedTweetDetail(id);
  const comments = await getCachedComments(id);
  if (!tweet) return notFound();
  const isAuthor = await getIsAuthor(tweet.userId);
  const { isLiked, likeCount } = await getCachedLikeStatus(id);

  return (
    <div className="pb-36 w-full">
      <div className="relative aspect-square w-3/5 mx-auto">
        <Image className="object-cover" fill src={`${tweet.photo}/public`} alt={tweet.title} />
      </div>
      <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
        <UserImage avatar={tweet.user.avatar} username={tweet.user.username} />
        <div>
          <h3>{tweet.user.username}</h3>
        </div>
      </div>
      <div className="p-5 flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">{tweet.title}</h1>
        <p>{tweet.description}</p>
        <div className="flex gap-5 items-start justify-between">
          <LikeButton isLiked={isLiked} likeCount={likeCount} tweetId={id} />
          <div className="flex items-center gap-2 text-neutral-400 text-sm">
            <EyeIcon className="size-5" />
            <span>조회 {tweet.views}</span>
          </div>
        </div>
        <AiComment tweetId={tweet.id} />
        <Comments initialComments={comments} tweetId={id} username={loggedInUser.username} />
      </div>
      <div className="fixed w-full bottom-0 left-0 p-5 pb-10 bg-stone-200 flex justify-between items-center">
        {isAuthor ? (
          <button className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold">Delete tweet</button>
        ) : null}
        <Link className="bg-rose-400 px-5 py-2.5 rounded-md text-white font-semibold" href={``}>
          채팅하기
        </Link>
      </div>
    </div>
  );
}
