import { notFound } from "next/navigation";

import FormButton from "@/components/form-button";
import { getSession } from "@/utils/session";
import db from "@/utils/db";
import { logOut } from "./actions";

export default async function ProfilePage() {
  const loggedInUser = await getUserInfoBySessionId();

  return (
    <main className="flex flex-col gap-5 pt-10 justify-between h-screen py-10">
      <div className="my-auto flex flex-col items-center gap-4 *:font-medium">
        <span className="text-9xl">🐹</span>
        <h3>어서오세요! {loggedInUser.username}님!</h3>
      </div>
      <form action={logOut}>
        <FormButton text="로그아웃" />
      </form>
    </main>
  );
}
export async function getUserInfoBySessionId() {
  const session = await getSession();
  console.log(session);
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}
