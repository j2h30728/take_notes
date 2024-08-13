"use client";

import { usePathname } from "next/navigation";
import {
  HomeIcon as SolidHomeIcon,
  NewspaperIcon as SolidNewspaperIcon,
  ChatBubbleOvalLeftEllipsisIcon as SolidChatIcon,
  VideoCameraIcon as SolidVideoCameraIcon,
  UserIcon as SolidUserIcon,
} from "@heroicons/react/24/solid";
import {
  HomeIcon as OutlineHomeIcon,
  NewspaperIcon as OutlineNewspaperIcon,
  ChatBubbleOvalLeftEllipsisIcon as OutlineChatIcon,
  VideoCameraIcon as OutlineVideoCameraIcon,
  UserIcon as OutlineUserIcon,
} from "@heroicons/react/24/outline";

import TabButton from "./tab-button";

export default function TabBar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 w-full mx-auto max-w-screen-sm  grid grid-cols-5 border-neutral-200 bg-stone-300 border-t px-5 py-3 *:text-stone-700">
      <TabButton
        title="홈"
        pathname="/"
        isActive={pathname === "/"}
        defaultIcon={<OutlineHomeIcon className="size-7" />}
        activeIcon={<SolidHomeIcon className="size-7" />}
      />
      <TabButton
        title="생활"
        pathname="/life"
        isActive={pathname === "/life"}
        defaultIcon={<OutlineNewspaperIcon className="size-7" />}
        activeIcon={<SolidNewspaperIcon className="size-7" />}
      />
      <TabButton
        title="채팅"
        pathname="/chat"
        isActive={pathname === "/chat"}
        defaultIcon={<OutlineChatIcon className="size-7" />}
        activeIcon={<SolidChatIcon className="size-7" />}
      />
      <TabButton
        title="쇼핑"
        pathname="/live"
        isActive={pathname === "/live"}
        defaultIcon={<OutlineVideoCameraIcon className="size-7" />}
        activeIcon={<SolidVideoCameraIcon className="size-7" />}
      />
      <TabButton
        title="나의 정보"
        pathname="/profile"
        isActive={pathname === "/profile"}
        defaultIcon={<OutlineUserIcon className="size-7" />}
        activeIcon={<SolidUserIcon className="size-7" />}
      />
    </div>
  );
}
