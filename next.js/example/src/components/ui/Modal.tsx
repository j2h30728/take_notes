"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

import useLockBodyScroll from "@/hooks/useLockBodyScroll";

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);
  useLockBodyScroll();

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }
  if (typeof window === "undefined" || !document) {
    return null;
  }

  return createPortal(
    <dialog ref={dialogRef} onClose={onDismiss}>
      <div onClick={onDismiss} className="fixed inset-0 w-screen h-screen bg-black bg-opacity-40">
        <div onClick={(e) => e.stopPropagation()} className="fixed -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
          {children}
        </div>
      </div>
    </dialog>,
    document.getElementById("modal-root")!
  );
}
