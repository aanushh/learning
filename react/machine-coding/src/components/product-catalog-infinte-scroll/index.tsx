import { useEffect, useState, useRef, type RefObject } from "react";

interface APIResponse {
  products: Product[];
  total: number;
  limit: number;
  skip: number;
}

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

const PRODUCTS_PER_PAGE = 10;

const useProductsData = <T extends APIResponse>() => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [data, setData] = useState<Product[]>([]);
  const [error, setError] = useState<{ message: string } | undefined>(
    undefined,
  );

  const updatePage = () => {
    setPage((prev) => prev + PRODUCTS_PER_PAGE);
  };

  useEffect(() => {
    let shouldUpdate = true;
    const controller = new AbortController();

    async function fetchData(page: number) {
      setIsLoading(true);

      try {
        const response = await fetch(
          `https://dummyjson.com/products?limit=${PRODUCTS_PER_PAGE}&skip=${
            (page - 1) * PRODUCTS_PER_PAGE
          }`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("Unable to fetch data");
        }

        const data = (await response.json()) as T;

        if (shouldUpdate) {
          setIsLoading(false);
          setData((prev) => [...prev, ...data.products]);
          page === 1 && setTotalItems(data.total);
        }
      } catch (error) {
        const errorData = {
          message: error instanceof Error ? error.message : "Unknown Error",
        };
        if (shouldUpdate) {
          setIsLoading(false);
          setError(errorData);
        }
      }
    }

    fetchData(page);

    return () => {
      shouldUpdate = false;
      controller.abort();
    };
  }, [page]);

  return {
    isLoading,
    data,
    error,
    updatePage,
    totalItems,
  };
};

const useIntersectionObserver = (
  ref: RefObject<Element | null>,
  options: { rootMargin?: string; threshold?: number },
) => {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const updateEntry = ([e]: IntersectionObserverEntry[]) => {
    setEntry(e);
  };

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(updateEntry, options);

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return entry;
};

export default function ProductCatalogApp() {
  const lastElementRef = useRef(null);
  const entry = useIntersectionObserver(lastElementRef, {
    rootMargin: "200px",
  });
  const { isLoading, data, error, updatePage, totalItems } = useProductsData();

  useEffect(() => {
    if (entry?.isIntersecting && !isLoading && data.length < totalItems) {
      updatePage();
    }
  }, [entry, updatePage]);

  return (
    <main>
      <section className="product-catalog">
        {data.map((product) => (
          <div key={product.id} className="product">
            <img src={product.thumbnail} alt={product.title} width={200} />
            <div>{product.title}</div>
            <span>{product.price}</span>
          </div>
        ))}
        <div ref={lastElementRef}></div>
      </section>

      {isLoading ? (
        <section>Loading {data.length > 0 ? "more" : ""} products...</section>
      ) : null}

      {!isLoading && totalItems === data.length ? (
        <section>No more products</section>
      ) : null}

      {error ? <section>error.message</section> : null}
    </main>
  );
}
