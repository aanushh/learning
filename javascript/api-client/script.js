// Default 10s timeout
const DEFAULT_REQUEST_TIMEOUT = 10000;

const UNKNOWN_ERROR = "Unknown Error";

class APIError extends Error {
  constructor({ errorCode, errorMessage, response }) {
    super(errorMessage);

    this.code = errorCode;
    this.message = errorMessage;
    this.response = response;
  }
}

async function fetchData(url, options = {}) {
  const {
    headers = {},
    method = "GET",
    timeout = DEFAULT_REQUEST_TIMEOUT,
    ...otherOptions
  } = options;

  const abortController = new AbortController();
  const timeoutTimerId = setTimeout(() => {
    abortController.abort();
  }, timeout);

  const requestInit = {
    method,
    headers: { ...headers, Accept: "application/json" },
    ...otherOptions,
    signal: abortController.signal,
  };

  try {
    const response = await fetch(url, requestInit);
    const responseData = await response.clone().json();

    if (response.ok) {
      // Can implement transformer or response interceptor
      // transform(responseData)

      return {
        data: responseData,
        error: undefined,
        // response // Optional response data
      };
    }

    // Failure (response NOT ok with a JSON error body)
    const { errorCode, errorMessage } = responseData;

    return {
      data: undefined,
      error: new APIError({
        errorCode,
        errorMessage,
        response: responseData,
      }),
      // response // Optional response data
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : undefined;

    return {
      data: undefined,
      error: new APIError({
        errorCode: -1,
        errorMessage,
        response: undefined,
      }),
      // response // Optional response data
    };
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchData("https://fakestoreapi.com/products", {
    timeout: 30000,
    cache: "no-cache",
  })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.error(err);
      // Send to sentry or other APMs
    });
});
