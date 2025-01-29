# useIntersectionObserver

```ts
import { useCallback, useRef, RefObject } from "react";

// Intersection Observer 콜백 타입 정의
type IntersectionCallback = () => void;

// 커스텀 훅 정의
const useIntersectionObserver = <T extends HTMLElement>(
  callback: IntersectionCallback // Intersection Observer 콜백 함수
): { targetItemRef: RefObject<T> } => {
  // 반환되는 객체 타입 선언
  // Intersection Observer 인스턴스의 참조를 유지하기 위한 useRef 훅 사용
  const observerRef = useRef<IntersectionObserver | null>(null);
  // 대상 엘리먼트의 참조를 유지하기 위한 useRef 훅 사용
  const targetItemRef = useRef<T>(null);

  // useCallback 훅을 사용하여 콜백 함수를 메모이제이션
  useCallback(() => {
    // Intersection Observer 콜백 함수 정의
    const handleIntersect: IntersectionObserverCallback = (entries) => {
      // 첫 번째 엔트리가 화면에 나타나면 콜백 함수 실행
      if (entries[0].isIntersecting) {
        callback();
      }
    };

    // 인스턴스가 존재하지 않을 때만 인스턴스 생성
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(handleIntersect, {
        threshold: 0.1, // 엘리먼트가 화면에 10% 이상 보일 때 콜백 호출
      });
    }

    // 대상 엘리먼트가 존재하면 Intersection Observer에 연결
    if (targetItemRef.current) {
      observerRef.current.observe(targetItemRef.current);
    }

    // 컴포넌트 언마운트 시 Intersection Observer 연결 해제
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [callback]); // 의존성 배열에는 콜백 함수 포함

  // 대상 엘리먼트의 참조를 반환하는 객체를 리턴
  return { targetItemRef };
};

export default useIntersectionObserver;
```
