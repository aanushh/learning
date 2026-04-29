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
 * @return {Array}
 */
const flatten = (value) => {
  if (!Array.isArray(value)) {
    return [value];
  }

  return value.reduce((acc, item) => {
    return acc.concat(Array.isArray(item) ? flatten(item) : item);
  }, []);
};
