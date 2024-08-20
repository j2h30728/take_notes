import TopBar from "@/components/top-bar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <TopBar />
      <div className="pt-12">{children}</div>
    </div>
  );
}
