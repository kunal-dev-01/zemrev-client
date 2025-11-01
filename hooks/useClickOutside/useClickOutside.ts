import { useEffect, useRef } from "react";

interface UseClickOutsideProps {
  onClickOutside: () => void;
  enabled?: boolean;
  ignoreRefs?: React.RefObject<HTMLElement>[];
}

export const useClickOutside = <T extends HTMLElement = HTMLElement>({ 
  onClickOutside, 
  enabled = true,
  ignoreRefs = []
}: UseClickOutsideProps) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      if (ref.current && ref.current.contains(target)) {
        return;
      }

      const isInsideIgnoredRefs = ignoreRefs.some(
        ignoreRef => ignoreRef.current && ignoreRef.current.contains(target)
      );

      if (isInsideIgnoredRefs) {
        return;
      }

      onClickOutside();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClickOutside, enabled, ignoreRefs]);

  return ref;
};