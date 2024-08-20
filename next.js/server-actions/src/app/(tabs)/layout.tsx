import TabBar from "@/components/tab-bar";
import TopBar from "@/components/top-bar";
import { getUserInfoBySession } from "@/service/userService";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserInfoBySession();
  return (
    <div>
      <TopBar />
      <div className="pt-11">{children}</div>
      <TabBar username={user.username} />
    </div>
  );
}
