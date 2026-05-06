import { memo, useDeferredValue, useMemo, useState } from "react";

const items = Array.from({ length: 10000 }, (_, i) => `Item-${i}`);

/**
 * While using useDeferredValue, react will update the deferredSearchQuery
 * a bit delayed then setSearchQuery. Which allows concurrent rendering.
 */

function DeferredSearchInput() {
  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearchQuery = useDeferredValue(searchQuery);

  const searchItems = useMemo(() => {
    if (!deferredSearchQuery) {
      return [];
    }

    return items.filter((item) =>
      item.toLowerCase().includes(deferredSearchQuery.toLowerCase()),
    );
  }, [deferredSearchQuery]);

  return (
    <section style={{ marginBlock: "24px" }}>
      <input
        type="search"
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search a name"
        value={searchQuery}
      />

      <ul>
        {searchItems.map((searchItem, i) => (
          <option key={searchItem}>{searchItem}</option>
        ))}
      </ul>
    </section>
  );
}

export default DeferredSearchInput;
