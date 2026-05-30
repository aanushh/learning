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
 * Recursively flattens the given array
 *
 * @param {Array<*|Array>} value
 * @param {number} depth
 * @return {Array}
 */
const flatten = (value, depth = 1) => {
  if (!Array.isArray(arr) || depth < 1) {
    return arr;
  }

  return arr.reduce((result, arrItem) => {
    return result.concat(flatten(arrItem, depth - 1));
  }, []);
};
