import ListTweet from "@/components/list-tweet";

import { getTweetsByLoggedInUser } from "@/service/tweetService";
import { getUserInfoBySession } from "@/service/userService";
import UserImage from "@/components/user-image";
import Link from "next/link";

export default async function UserInfoPage({ params }: { params: { username: string } }) {
  const loggedInUser = await getUserInfoBySession();
  const tweets = await getTweetsByLoggedInUser();

  return (
    <main className="flex flex-col pt-10 pb-40 h-screen px-3">
      <div>
        <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
          <UserImage avatar={loggedInUser.avatar} username={loggedInUser.username} />
          <div className="flex gap-4 items-end">
            <h3>{loggedInUser.username}</h3>
            <small className="text-stone-400">{loggedInUser.email}</small>
          </div>
          {params.username === loggedInUser.username && (
            <Link className="ml-auto primary-button w-fit px-3" href={`/users/${loggedInUser.username}/edit`}>
              내 정보 수정
            </Link>
          )}
        </div>
      </div>
      <div className="p-5 flex flex-col gap-5">
        {tweets?.map((tweet) => (
          <ListTweet key={tweet.id} {...tweet} />
        ))}
      </div>
    </main>
  );
}
