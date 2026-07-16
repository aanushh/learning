import { useState, useMemo } from "react";

function getConsumableState(state, defaultState) {
  if (typeof state === "null" || typeof state === "undefined") {
    return defaultState;
  }

  return state;
}

export default function useDefault(initialState, defaultState) {
  const [state, setState] = useState(
    getConsumableState(initialState, defaultState),
  );

  const consumableState = useMemo(
    () => getConsumableState(state, defaultState),
    [state, defaultState],
  );

  return [consumableState, setState];
}
