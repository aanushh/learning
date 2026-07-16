import { useEffect, useRef, useState } from "react";

/**
 * @template T
 * @param {T} value
 * @param {number} delay
 */
const useDebouncedValue = (value, delay = 300) => {
  const timerRef = useRef(null);
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value, delay]);

  return debouncedValue;
};
