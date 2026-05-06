import {
  memo,
  useMemo,
  useState,
  useTransition,
  type ChangeEvent,
} from "react";

const debounce = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number,
) => {
  let timerId: ReturnType<typeof setTimeout>;

  return (...args: T) => {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

/**
 * While using startTransition, make sure to use memo()
 * so that the child components are memoized which enables
 * concurrent rendering.
 */
const SearchItems = memo(({ listItems }: { listItems: string[] }) => {
  return (
    <ul>
      {listItems.map((listItem, i) => (
        <option key={listItem + i}>{listItem}</option>
      ))}
    </ul>
  );
});

function SearchInput() {
  const [listItems, setListItems] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const onSearchDebounced = useMemo(
    () =>
      debounce((event: ChangeEvent<HTMLInputElement>) => {
        /**
         * By using startTransition we tell react to
         * mark certain state updates as non-urgent
         */
        startTransition(() => {
          const currentValue = event.target.value;

          if (!currentValue) {
            setListItems([]);

            return;
          }

          const listFromValue = Array.from(
            { length: 10000 },
            (_, i) => `${currentValue} - ${i}`,
          );

          setListItems(listFromValue);
        });
      }, 200),
    [],
  );

  return (
    <section style={{ marginBlock: "24px" }}>
      <input
        type="search"
        onChange={onSearchDebounced}
        placeholder="Search a name"
      />

      <p style={{ height: "20px" }}>{isPending ? "Loading ..." : ""}</p>

      <SearchItems listItems={listItems} />
    </section>
  );
}

export default SearchInput;
