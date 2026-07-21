import { useState } from "react";
import FileExplorer from "./components/file-explorer";
import ModalWrapperApp from "./components/modal";

type AppNames = "file-explorer" | "modal";

const apps: AppNames[] = ["file-explorer", "modal"];

function App() {
  const [appName, setAppName] = useState<AppNames>("modal");

  const renderApp = (appName: AppNames) => {
    switch (appName) {
      case "file-explorer": {
        return <FileExplorer />;
      }

      case "modal": {
        return <ModalWrapperApp />;
      }
    }
  };

  return (
    <main>
      <h1>Collection of my React machine coding tasks</h1>

      <section style={{ display: "flex", gap: "1rem" }}>
        {apps.map((item) => (
          <button
            aria-label={`Shows app: ${item}`}
            onClick={() => setAppName(item)}
            key={item}
          >
            {item}
          </button>
        ))}
      </section>

      <section style={{ marginBlockStart: "5rem" }}>
        {renderApp(appName)}
      </section>
    </main>
  );
}

export default App;
