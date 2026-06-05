/**
 * Counts the frequency of elements in an Array
 *
 * @param {Array<*|Array>} value
 * @return {Object}
 */
const countFrequencyOfItems = (arr) => {
  if (!Array.isArray(arr)) {
    return undefined;
  }

  const frequencyOfItemsObj = {};

  /**
   * Alternative solution:
   *
   * arr.forEach((element) => {
   *   const frequency = frequencyOfItemsObj[element] ?? 0;
   *   frequencyOfItemsObj[element] = frequency + 1;
   * });
   */
  for (const element of arr) {
    const frequency = frequencyOfItemsObj[element] ?? 0;

    frequencyOfItemsObj[element] = frequency + 1;
  }

  return frequencyOfItemsObj;
};

/**
 * Recursively flattens the given array based on given depth
 *
 * @param {Array<*|Array>} arr
 * @param {number} depth
 * @return {Array}
 */
const flatten = (arr, depth = 1) => {
  if (!Array.isArray(arr) || depth < 1) {
    return arr;
  }

  /**
   * In case, reduce() should be avoided in
   * any scenario, use forEach or for.
   */

  return arr.reduce((result, arrItem) => {
    return result.concat(flatten(arrItem, depth - 1));
  }, []);
};

/**
 *
 * @param {Array<*|Array>} arr
 * @param {*} validator
 */
const filter = (arr, validator) => {
  if (!Array.isArray(arr) || typeof validator !== "function") {
    return [];
  }

  /**
   * In case, reduce() should be avoided in
   * any scenario, use forEach or for.
   */

  return arr.reduce((acc, item) => {
    const shouldInclude = validator(item);

    if (shouldInclude) {
      acc.push(item);
    }

    return acc;
  }, []);
};
