"use client";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex flex-col gap-20 items-center justify-start py-40 w-full h-screen rounded-[4px] mx-auto my-0 bg-gray/200">
      <div className="flex flex-col items-center gap-5">
        <h2 className="font-bold text-text44">에러가 발생했습니다!</h2>
        <p className="p-2 text-text15">{error.message}</p>
      </div>
      <button
        onClick={() => reset()}
        className="flex mt-auto justify-center items-center rounded-[4px] border border-blue-600 text-blue-600 px-4 py-2">
        재시도
      </button>
    </div>
  );
}
