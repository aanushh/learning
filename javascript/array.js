/**
 * Counts the frequency of elements in an Array
 */
function countFrequencyOfItems(arr) {
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
}
