import { useCallback } from "react";

/**
 * @template T
 * @param {(arg: T) => void} callback
 * @param {number} delay
 * @returns {(arg: T) => void}
 */
const useDebounce = (callback, delay = 300) => {
  const timerRef = useRef(null);

  return useCallback(
    (...args) => {
      clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );
};
