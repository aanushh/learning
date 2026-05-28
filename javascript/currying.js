/**
 * Addition of 2 numbers using currying
 *
 * Also be implemented as: (x) => (y) => x + y;
 */
function add(x) {
  return function (y) {
    return x + y;
  };
}

/**
 * Compose function which takes in multiple composers and
 * returns a evaluate function. Evaluation order is from right to left.
 */
function compose(...callbacks) {
  return (arg) => {
    return callbacks.reduceRight((input, callback) => callback(input), arg);
  };
}

/**
 * Pipe function which takes in multiple composers and
 * returns a evaluate function. Evaluation order is from left to right.
 */
function pipe(...callbacks) {
  return (arg) => {
    return callbacks.reduce((input, callback) => callback(input), arg);
  };
}
