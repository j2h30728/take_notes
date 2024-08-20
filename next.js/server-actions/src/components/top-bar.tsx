"use client";

import { ChevronLeftIcon as LeftArrowIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

import { usePathname, useRouter } from "next/navigation";

export default function TopBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="h-12 fixed top-0 w-full mx-auto max-w-screen-sm flex items-center border-neutral-200 bg-stone-300 border-t px-5 py-1 *:text-stone-700">
      {pathname !== "/" ? (
        <button onClick={() => router.back()} className="flex flex-col items-center gap-px">
          <LeftArrowIcon className="size-7" />
        </button>
      ) : null}
      <Link href="/search" className="flex flex-col items-center gap-px ml-auto">
        <MagnifyingGlassIcon className="size-6" />
      </Link>
    </div>
  );
}
