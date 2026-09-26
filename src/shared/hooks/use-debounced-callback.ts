// shared/hooks/use-debounced-callback.ts
import { useEffect, useMemo, useRef } from "react";

export function useDebouncedCallback<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delay = 500,
) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => () => clearTimeout(timeoutRef.current), []);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  return useMemo(
    () =>
      (...args: Args) => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => callbackRef.current(...args), delay);
      },
    [delay],
  );
}