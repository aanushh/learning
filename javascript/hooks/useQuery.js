import { useEffect, useState } from "react";

/**
 * interface UseQueryStore {
 *   status?: "loading" | "error" | "success";
 *   data: unknown;
 *   error: Error;
 * }
 */

/**
 * @template T
 * @param {() => Promise<T>} fn
 * @param {import("react").DependencyList} deps
 */
export default function useQuery(fn, deps = []) {
  const [store, setStore] = useState({});

  useEffect(() => {
    let shouldIgnore = false;

    async function executeAsyncFn() {
      setStore({ status: "loading" });

      try {
        const data = await Promise.resolve(fn());

        if (!shouldIgnore) {
          setStore({ status: "success", data });
        }
      } catch (error) {
        if (!shouldIgnore) {
          setStore({ status: "error", error });
        }
      }
    }

    executeAsyncFn();

    return () => {
      shouldIgnore = true;
    };
  }, deps);

  return store;
}
