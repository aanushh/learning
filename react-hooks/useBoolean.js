import { useState } from "react";

/**
 * @param {boolean} [initialValue=false]
 * @typedef {{
 *   value: boolean,
 *   setTrue: () => void,
 *   setFalse: () => void,
 * }} UseBooleanReturn
 * @returns {UseBooleanReturn}
 */
export default function useBoolean(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const setTrue = () => {
    setValue(true);
  };

  const setFalse = () => {
    setValue(false);
  };

  return {
    value,
    setTrue,
    setFalse,
  };
}
