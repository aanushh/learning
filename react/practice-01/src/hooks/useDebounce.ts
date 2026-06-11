import { useCallback, useEffect, useRef } from "react";

type Timer = ReturnType<typeof setTimeout>;

const useDebounce = <Args>(callback: (args: Args) => void, delay: number) => {
  const timer = useRef<Timer>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    return () => {
      const timerId = timer.current;

      if (!timerId) {
        return;
      }

      clearTimeout(timerId);
    };
  }, []);

  const debouncedFunction = useCallback(
    (args: Args) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => {
        if (typeof callbackRef.current === "function") {
          callbackRef.current(args);
        }
      }, delay);
    },
    [delay],
  );

  return debouncedFunction;
};

export default useDebounce;
