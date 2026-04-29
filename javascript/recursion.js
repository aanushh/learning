/**
 * Recursively prints the number from given start and end points
 *
 * @param {number} start
 * @param {number} end
 * @returns
 */
const printNumbers = (start, end) => {
  console.log(start);

  if (start === end) {
    return;
  } else {
    printNumbers(start + 1, end);
  }
};
