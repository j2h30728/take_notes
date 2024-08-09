"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col h-screen justify-between py-10">
      <div className="my-auto flex flex-col items-center gap-4 *:font-medium">
        <span className="text-9xl">🐹</span>
        <h1 className="text-4xl ">담군</h1>
        <h2 className="text-2xl">담군에 어서오세요!</h2>
      </div>
      <div className="flex flex-col gap-5">
        <Link className="primary-button text-center" href={"/create-account"}>
          시작하기
        </Link>
        <div className="flex gap-2">
          <span>이미 계정이 있나요?</span>
          <Link href="/log-in" className="hover:underline text-stone-600">
            로그인
          </Link>
        </div>
      </div>
    </main>
  );
}
