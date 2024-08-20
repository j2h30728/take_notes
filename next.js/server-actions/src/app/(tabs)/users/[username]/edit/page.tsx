import ProfileEditForm from "@/components/profile-edit-form";
import UserImage from "@/components/user-image";
import { getUserInfoBySession } from "@/service/userService";

export default async function ProfileEditPage({ params }: { params: { username: string } }) {
  const user = await getUserInfoBySession();

  return (
    <main className="flex flex-col pt-10 pb-40 h-screen px-3 ">
      <UserImage style="mx-auto mb-5" avatar={user.avatar} username={user.username} width={100} height={100} />
      <ProfileEditForm initialUserInformation={user} />
    </main>
  );
}
