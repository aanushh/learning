// Promise.all([promise, promise, promise])

/**
 *
 * @param {any[]} promises
 * @returns
 */
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      reject(new Error("Argument must be an Array"));
    }

    if (promises.length === 0) {
      resolve([]);
    }

    let remainingPromises = promises.length;
    const promiseResults = [];

    promises.forEach(async (promise, index) => {
      // Alternatively, without using async/await
      //
      // Promise.resolve(promise)
      //   .then((result) => {
      //     promiseResults[index] = result;
      //     remainingPromises++;
      //
      //     if (remainingPromises === promises.length) {
      //       resolve(promiseResults);
      //     }
      //   })
      //   .catch((err) => reject(err));

      try {
        const result = await Promise.resolve(promise);

        promiseResults[index] = result;
        remainingPromises--;

        if (remainingPromises === 0) {
          resolve(promiseResults);
        }
      } catch (err) {
        reject(err);
      }
    });
  });
}
