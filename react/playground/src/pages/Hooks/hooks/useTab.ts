import { useState } from "react";

export const contents = [
  { tab: "Section 1", content: "Section 1 입니다." },
  { tab: "Section 2", content: "Section 2 입니다." },
];

const useTab = (initialIndex: number, allTabs: typeof contents) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  return {
    changeItem: setCurrentIndex,
    currentItem: allTabs[currentIndex],
  };
};
export default useTab;
