/**
 * Debounces the invocation of callback function for the given wait time.
 *
 * @param {(...args: Array<unknown>) => unknown} func
 * @param {number} wait
 * @returns {(...args: Array<unknown>) => void}
 */
function debounce(func, wait) {
  let timerId = null;

  return function (...args) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      if (typeof func === "function") {
        func.apply(this, args);
      }
    }, wait);
  };
}
