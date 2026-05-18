import { MAX_API_REQUEST_TIMEOUT_TIME } from "../constants/api";

export const fetchData = async <T>(url: string) => {
  const abortController = new AbortController();
  const reqTimeoutTimerId = setTimeout(
    () => abortController.abort(),
    MAX_API_REQUEST_TIMEOUT_TIME,
  );

  try {
    const response = await fetch(url, { signal: abortController.signal });

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    const responseData = (await response.json()) as T;

    clearTimeout(reqTimeoutTimerId);

    return { data: responseData, error: undefined };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : undefined;

    clearTimeout(reqTimeoutTimerId);

    return { data: undefined, error: { message: errorMsg } };
  }
};
