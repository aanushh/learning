/**
 * Throttles the invocation of callback function for the given wait time. (Traditional)
 *
 * @param {(this: any, ...args: Array<unknown>) => unknown} func
 * @param {number} wait
 * @returns {(this: any, ...args: Array<unknown>) => unknown}
 */
function throttle(func, wait) {
  let shouldThrottle = false;

  return function (...args) {
    if (shouldThrottle) {
      return;
    }

    shouldThrottle = true;

    if (typeof func === "function") {
      func.apply(this, args);
    }

    setTimeout(() => {
      shouldThrottle = false;
    }, wait);
  };
}

/**
 * Throttles the invocation of callback function for the given wait time. (Without timer)
 *
 * @param {(this: any, ...args: Array<unknown>) => unknown} func
 * @param {number} wait
 * @returns {(this: any, ...args: Array<unknown>) => unknown}
 */
export default function throttle(func, wait) {
  let previousTime = 0;

  return function (...args) {
    const currentTime = Date.now();

    if (currentTime - previousTime < wait) {
      return;
    }

    previousTime = currentTime;

    if (typeof func === "function") {
      func.apply(this, args);
    }
  };
}
