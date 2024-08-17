import { addTweetComment } from "@/app/tweets/[id]/actions";
import FormInput from "./form-input";

export default function UploadCommentForm({ tweetId }: { tweetId: number }) {
  return (
    <form action={addTweetComment} className="flex w-full gap-2 comment-form">
      <FormInput name="text" type="text" required placeholder="코멘트를 입력해주세요." />
      <input type="hidden" name="tweetId" value={tweetId} />
      <button className="primary-button">추가</button>
    </form>
  );
}
