"use client";

import { InitialComments } from "@/app/tweets/[id]/page";
import { useOptimistic } from "react";
import { addTweetComment, deleteComment } from "@/app/tweets/[id]/actions";
import FormInput from "./form-input";
import { commentSchema } from "@/utils/schema";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/solid";

type CommentOptimisticValue =
  | {
      action: "add";
      newComment: string;
    }
  | { action: "delete"; commentId: number };

export default function Comments({
  initialComments,
  tweetId,
  username,
}: {
  initialComments: InitialComments;
  tweetId: number;
  username: string;
}) {
  const [comments, reducer] = useOptimistic(
    initialComments,
    (previousComments, commentOptimisticValue: CommentOptimisticValue) => {
      if (commentOptimisticValue.action === "add") {
        return [
          ...previousComments,
          {
            id: new Date().getDate(),
            text: commentOptimisticValue.newComment,
            created_at: new Date(),
            tweetId,
            user: { username, id: 0 },
            isAuthor: true,
          },
        ];
      }

      return previousComments.filter((comment) => comment.id !== commentOptimisticValue.commentId);
    }
  );

  const handleUploadComment = (formData: FormData) => {
    const result = commentSchema.safeParse(formData.get("text"));
    if (result.success) {
      reducer({ action: "add", newComment: result.data });
      addTweetComment(formData);
    }
  };
  const handleDeleteComment = (formData: FormData) => {
    const commentId = Number(formData.get("commentId"));
    console.log(commentId, tweetId);
    reducer({ action: "delete", commentId });
    deleteComment(commentId, tweetId);
  };

  return (
    <div>
      <form action={handleUploadComment} className="flex w-full gap-2 comment-form">
        <FormInput
          label={<ChatBubbleBottomCenterTextIcon className="size-5" />}
          name="text"
          type="text"
          required
          placeholder="코멘트를 입력해주세요."
        />
        <input type="hidden" name="tweetId" value={tweetId} />
        <button className="primary-button">추가</button>
      </form>
      {comments.map((comment) => (
        <div key={comment.id} className="*:text-md flex items-center my-3">
          <span className="font-semibold w-3/12">{comment.user.username}</span>
          <span> {comment.text}</span>
          {comment.isAuthor ? (
            <form
              className="text-sm ml-auto primary-button size-6 flex justify-center items-center"
              action={handleDeleteComment}>
              <input type="hidden" name="commentId" value={comment.id} />
              <button>X</button>
            </form>
          ) : null}
        </div>
      ))}
    </div>
  );
}
