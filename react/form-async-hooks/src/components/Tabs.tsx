import { useSuspenseQuery } from "@tanstack/react-query";

export function AboutTab() {
  return <h2>About</h2>;
}

export function HomeTab() {
  return <h2>Home</h2>;
}

export function BlockingTab({ count }: { count: number }) {
  const items = Array.from({ length: 10 }, (_, i) => i + count);

  return (
    <>
      <h2>Blocking</h2>
      {items.map((i) => (
        <BlockingComponent key={i} i={i} />
      ))}
    </>
  );
}

function BlockingComponent({ i }: { i: number }) {
  // eslint-disable-next-line react-hooks/purity
  const start = performance.now();

  // eslint-disable-next-line react-hooks/purity
  while (performance.now() - start < 50) {
    // 50 ms wait time
  }

  return <div>{i}</div>;
}

export function AsyncTab({ count }: { count: number }) {
  const { data } = useSuspenseQuery({
    queryKey: ["asyncData", count],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      return `Async data: ${count}`;
    },
  });

  return <h2>{data}</h2>;
}
