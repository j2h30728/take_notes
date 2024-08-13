import TabBar from "@/components/tab-bar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
      <TabBar />
    </div>
  );
}
