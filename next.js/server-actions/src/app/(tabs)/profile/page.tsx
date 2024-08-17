import FormButton from "@/components/form-button";
import { logOut } from "./actions";
import { getUserInfoBySession } from "@/service/userService";

export default async function ProfilePage() {
  const loggedInUser = await getUserInfoBySession();

  return (
    <main className="flex flex-col gap-5 pt-10 pb-40 justify-between h-screen px-3">
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
