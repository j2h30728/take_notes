import { getUserInfoBySession } from "@/service/userService";
import { notFound } from "next/navigation";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { username: string };
}>) {
  const loggedInUser = await getUserInfoBySession();
  if (params.username !== loggedInUser.username) {
    // 에러 메시지 후 리다이렉트 필요
    notFound();
  }
  return <div>{children}</div>;
}
