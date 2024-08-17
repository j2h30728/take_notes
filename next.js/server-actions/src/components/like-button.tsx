"use client";

import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import { HandThumbUpIcon as OutlineHandThumbUpIcon } from "@heroicons/react/24/outline";
import { useOptimistic } from "react";
import { dislikeTweet, likeTweet } from "@/app/tweets/[id]/actions";

export default function LikeButton({
  isLiked,
  likeCount,
  tweetId,
}: {
  isLiked: boolean;
  likeCount: number;
  tweetId: number;
}) {
  const [state, reducer] = useOptimistic({ likeCount, isLiked }, (previousState, _) => ({
    likeCount: previousState.isLiked ? previousState.likeCount - 1 : previousState.likeCount + 1,
    isLiked: !previousState.isLiked,
  }));

  const handleLikeButton = () => {
    reducer(null);
    if (isLiked) {
      dislikeTweet(tweetId);
    } else {
      likeTweet(tweetId);
    }
  };

  return (
    <form action={handleLikeButton}>
      <button
        className={`flex items-center gap-2 text-stone-400  text-sm border border-stone-300 rounded-full p-2  transition-colors ${
          state.isLiked ? "bg-rose-400 text-white border-rose-400" : "hover:bg-stone-300"
        }`}>
        {state.isLiked ? <HandThumbUpIcon className="size-5" /> : <OutlineHandThumbUpIcon className="size-5" />}
        {state.isLiked ? <span> {state.likeCount}</span> : <span>공감하기 ({state.likeCount})</span>}
      </button>
    </form>
  );
}
