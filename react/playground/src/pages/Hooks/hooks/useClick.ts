import { useEffect, useRef } from "react";

const useClick = <Ref extends HTMLElement>(callback: () => void) => {
  const element = useRef<Ref>(null);
  useEffect(() => {
    if (element.current) {
      element.current.addEventListener("click", callback);
    }
    return () => {
      if (element.current) {
        element.current.removeEventListener("click", callback);
      }
    };
  }, [callback]);

  if (typeof callback !== "function") {
    return;
  }

  return element;
};

export default useClick;
