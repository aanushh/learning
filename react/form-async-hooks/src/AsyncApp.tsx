import { Suspense, useDeferredValue, useState, useTransition } from "react";
import { AboutTab, AsyncTab, BlockingTab, HomeTab } from "./components/Tabs";

type Tab = "about" | "async" | "blocking" | "home";

const buttonStyles = { marginInlineStart: "1rem" };

function App() {
  const [selectedTab, setSelectedTab] = useState<Tab>("home");
  const [count, setCount] = useState(0);
  const deferredTab = useDeferredValue(selectedTab);
  const deferredCount = useDeferredValue(count);
  const [isPending, startTransition] = useTransition();

  function setCurrentTab(tab: Tab) {
    startTransition(() => {
      setSelectedTab(tab);
    });
  }

  return (
    <>
      <div>
        <span>Count: {count}</span>
        <button style={buttonStyles} onClick={() => setCount((c) => c + 1)}>
          +
        </button>
      </div>

      <br />

      <button onClick={() => setCurrentTab("home")}>Home</button>
      <button onClick={() => setCurrentTab("async")}>Async</button>
      <button onClick={() => setCurrentTab("blocking")}>Blocking</button>
      <button onClick={() => setCurrentTab("about")}>About</button>

      {isPending ? <h1>Loading...</h1> : null}

      <br />

      <section>
        {deferredTab === "about" ? <AboutTab /> : null}
        {deferredTab === "home" ? <HomeTab /> : null}

        {deferredTab === "async" ? (
          <Suspense fallback={<h2>Loading async section...</h2>}>
            <AsyncTab count={deferredCount} />{" "}
          </Suspense>
        ) : null}

        {deferredTab === "blocking" ? (
          <Suspense fallback={<h2>Loading async section...</h2>}>
            <BlockingTab count={deferredCount} />
          </Suspense>
        ) : null}
      </section>
    </>
  );
}

export default App;
