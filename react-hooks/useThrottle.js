import { useCallback, useRef } from "react";

/**
 * @template T
 * @param {(arg: T) => void} callback
 * @param {number} delay
 * @returns {(arg: T) => void}
 */
const useThrottle = (callback, delay = 300) => {
  const previousTime = useRef(0);

  return useCallback(
    (...args) => {
      const now = Date.now();

      if (previousTime.current - now < delay) {
        return;
      }

      previousTime.current = now;
      callback(...args);
    },
    [callback, delay],
  );
};
