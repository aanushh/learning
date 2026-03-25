/**
 * Checks if an object is empty
 *
 * @returns {boolean}
 */
function isEmptyObject(obj) {
  // Alternate solution:
  //   return Object.keys(obj).length === 0

  for (const key in obj) {
    return false;
  }

  return true;
}

/**
 * Sums all the properties in the object
 *
 * @returns {number}
 */
function sumObjectProperties(obj) {
  // Alternate solution:
  //   return Object.values(obj).reduce((sum, salary) => {
  //     sum += +salary;
  //     return sum
  //   }, 0);

  let sum = 0;

  for (const key in obj) {
    sum += +obj[key];
  }

  return sum;
}

/**
 * Multiplies numeric property value by two in a object
 *
 * @returns modified object where the numbers are doubled
 */
function multiplyNumberByTwo(obj) {
  for (const key in obj) {
    const value = obj[key];

    if (typeof value === "number") {
      obj[key] = value * 2;
    }
  }

  return obj;
}
