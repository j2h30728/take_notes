import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-20 items-center justify-start py-40 w-full h-screen rounded-[4px] mx-auto my-0 bg-gray/200">
      <div className="flex flex-col items-center gap-5">
        <h2 className="font-bold text-text44">Not Found</h2>
        <p className="p-2 text-text15">요청된 리소스를 찾을 수 없습니다.</p>
      </div>
      <Link
        href="/"
        className="flex mt-auto justify-center items-center rounded-[4px] border border-blue/600 text-blue/600 px-4 py-2"
      >
        홈으로 이동하기
      </Link>
    </div>
  );
}
