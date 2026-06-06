/**
 * Implement the classnames function.
 *
 * Examples:
 * - classNames('foo', 'bar'); // 'foo bar'
 * - classNames('foo', { bar: true }); // 'foo bar'
 * - classNames({ 'foo-bar': true }); // 'foo-bar'
 * - classNames({ 'foo-bar': false }); // ''
 * - classNames({ foo: true }, { bar: true }); // 'foo bar'
 * - classNames({ foo: true, bar: true }); // 'foo bar'
 * - classNames({ foo: true, bar: false, qux: true }); // 'foo qux'
 *
 * Arrays will be recursively flattened as per the rules above.
 * - classNames('a', ['b', { c: true, d: false }]); // 'a b c'
 *
 * Values can be mixed.
 * classNames(
 *   'foo',
 *   {
 *     bar: true,
 *     duck: false,
 *   },
 *  'baz',
 *  { quux: true },
 * ); // 'foo bar baz quux'
 *
 * Falsey values are ignored.
 * - classNames(null, false, 'bar', undefined, { baz: null }, ''); // 'bar'
 *
 * De-duplicated values are ignored.
 * - classNames('bar', 'bar', 'foo'); // 'bar foo'
 *
 * @param {...(any|Object|Array<any|Object|Array>)} args
 * @return {string}
 */
export default function classNames(...args) {
  return args
    .reduce((acc, arg) => {
      if (!arg) {
        return acc;
      }

      if (Array.isArray(arg)) {
        arg.forEach((item) => {
          const classNameItem = classNames(item);

          if (!acc.includes(classNameItem)) {
            acc.push(classNameItem);
          }
        });
      }

      if (!Array.isArray(arg) && typeof arg === "object") {
        Object.entries(arg).map(([item, isValid]) => {
          if (isValid && !acc.includes(item)) {
            acc.push(item);
          }
        });
      }

      if (
        (typeof arg === "string" || typeof arg === "number") &&
        !acc.includes(arg)
      ) {
        acc.push(`${arg}`);
      }

      return acc;
    }, [])
    .join(" ");
}
