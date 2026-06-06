/**
 * Given an unsorted array of integers numbers, determine the length of
 * the longest sequence where the integers appear consecutively, meaning
 * the numbers follow one another without any gaps.
 *
 * Input:
 * - numbers: number[]: An array of integers
 *
 * Notes:
 * - Solution should have a time complexity of O(n)
 *
 * Examples:
 *
 * Input: numbers = [5,1,-4]
 * Output: 1
 * Explanation: No consecutive numbers exist, so the longest consecutive sequence is any single number, giving a length of 1
 *
 * Input: numbers = [1,-1,-1,-4,-5]
 * Output: 2
 * Explanation: The consecutive sequences are [1], [-1], [-5, -4]. The longest is [-5, -4], with a length of 2
 *
 * Input: numbers = [1,-1,0,8,11,10,9,9]
 * Output: 4
 * Explanation: The longest consecutive sequence is 8, 9, 10, 11, with a length of 4 and duplicates are ignored.
 *
 * Constraints
 * - 0 <= numbers.length <= 100,000
 * - -1,000,000,000 <= numbers[i] <= 1,000,000,000
 *
 * @param {number[]} numbers
 * @return {number}
 */
function longestConsecutiveNumberSeq(numbers) {
  const sortedNumbers = numbers.sort((a, b) => a - b);

  let prevNum = 0;
  let group = 0;
  const longestSequenceCollection = [];

  sortedNumbers.forEach((num) => {
    const difference = Math.abs(num - prevNum);

    if (difference !== 1 && difference !== 0) {
      group++;
    }

    const cache = longestSequenceCollection[group] || [];

    if (!cache.includes(num)) {
      longestSequenceCollection[group] = [...cache, num];
    }

    prevNum = num;
  });

  const result = longestSequenceCollection.reduce((prev, item) => {
    if (prev.length < item.length) {
      prev = item;
    }

    return prev;
  }, []);

  return result.length;
}
