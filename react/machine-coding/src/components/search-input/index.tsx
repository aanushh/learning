import {
  useState,
  useEffect,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import "./styles.css";

type APIResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

type Product = {
  id: number;
  title: string;
};

const DEBOUNCE_DELAY = 300;

function useDebouncedValue(value: string) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, DEBOUNCE_DELAY);

    return () => {
      clearTimeout(timerId);
    };
  }, [value]);

  return debouncedValue;
}

function useFetch<T>(url: string | undefined) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<{ message: string } | undefined>(
    undefined,
  );

  useEffect(() => {
    if (!url) {
      setData(undefined);
      setError(undefined);
      setIsLoading(false);
      return;
    }

    let shouldIgnore = false;
    const controller = new AbortController();

    async function fetchData() {
      if (!url) {
        return;
      }

      try {
        setIsLoading(true);

        const options = { signal: controller.signal };
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error("Unable to fetch data");
        }

        const data = (await response.json()) as T;

        if (!shouldIgnore) {
          setData(data);
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        const errorMessage =
          error instanceof Error ? error.message : "Unknown Error";

        if (!shouldIgnore) {
          setError({ message: errorMessage });
        }
      } finally {
        if (!shouldIgnore) {
          setIsLoading(false);
        }
      }
    }

    setError(undefined);
    fetchData();

    return () => {
      shouldIgnore = true;
      controller.abort();
    };
  }, [url]);

  return { data, error, isLoading };
}

function useProducts(search: string) {
  const debouncedSearch = useDebouncedValue(search);

  const url =
    debouncedSearch.length > 0
      ? `https://dummyjson.com/products/search?q=${debouncedSearch}&limit=15`
      : undefined;

  const { isLoading, data, error } = useFetch<APIResponse>(url);

  const { products = [] } = data || {};

  return { isLoading, products, error };
}

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeResultIndex, setActiveResultIndex] = useState(-1);
  const { isLoading, products } = useProducts(searchTerm);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setIsOpen(value.length > 0);
    setSearchTerm(value);
    setActiveResultIndex(-1);
  };

  const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const key = event.key;

    if (products.length === 0) {
      return;
    }

    switch (key) {
      case "ArrowDown": {
        setActiveResultIndex((prev) =>
          prev === products.length - 1 ? 0 : prev + 1,
        );
        break;
      }

      case "ArrowUp": {
        setActiveResultIndex((prev) =>
          prev <= 0 ? products.length - 1 : prev - 1,
        );
        break;
      }

      case "Escape": {
        handleCloseSuggestions();
        break;
      }

      case "Enter": {
        if (products.length > 0 && products[activeResultIndex]) {
          onSelectResult(products[activeResultIndex].title);
        }

        break;
      }

      default:
        break;
    }
  };

  const handleCloseSuggestions = () => {
    setIsOpen(false);
    setActiveResultIndex(-1);
  };

  const onSelectResult = (value: string) => {
    if (!value) {
      return;
    }

    setIsOpen(false);
    setActiveResultIndex(-1);
    setSearchTerm(value);
  };

  return (
    <div className="App">
      <h1>Search with debounce</h1>

      <div className="search-wrapper">
        <input
          aria-label="Search products"
          aria-expanded={isOpen}
          aria-controls="search-results"
          autoComplete="off"
          id="search"
          name="search"
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDown}
          type="text"
          value={searchTerm}
          role="combobox"
        />

        {isOpen ? (
          <ul
            id="search-results"
            className="search-results"
            aria-labelledby="search"
            role="listbox"
            tabIndex={0}
          >
            {products.map((product, i) => (
              <li
                role="option"
                key={product.id}
                className={`${activeResultIndex == i ? "active" : ""}`}
                aria-selected={activeResultIndex == i}
                onMouseEnter={() => setActiveResultIndex(i)}
                onClick={() => onSelectResult(product.title)}
              >
                {product.title}
              </li>
            ))}

            {isLoading ? <li>Loading</li> : null}
            {!isLoading && products.length === 0 ? <li>No results</li> : null}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
