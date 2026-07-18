import { useState, forwardRef, useRef, type KeyboardEvent } from "react";
import "./styles.css";

interface Tab {
  id: string;
  label: string;
  content: string;
}

interface TabsProps {
  tabs: Tab[];
}

interface TabListProps {
  activeTabId: string;
  onChangeActiveTab: (tabId: string) => void;
  tabs: Tab[];
}

interface TabItemProps {
  id: string;
  isActive: boolean;
  label: string;
  panelId: string;
  onClick: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
}

interface TabPanelProps {
  id: string;
  content: string;
  isActive: boolean;
  tabId: string;
}

const Tabs = ({ tabs }: TabsProps) => {
  const [activeTabId, setActiveTabId] = useState(() => {
    if (!tabs.length) {
      return "";
    }

    return tabs[0].id;
  });

  const onChangeActiveTab = (tabId: string) => {
    setActiveTabId(tabId);
  };

  return (
    <div>
      <TabList
        activeTabId={activeTabId}
        tabs={tabs}
        onChangeActiveTab={onChangeActiveTab}
      />

      <div className="tabs-panel-wrapper">
        {tabs.map(({ id, content }) => {
          const tabId = `${id}-tab`;
          const panelId = `${id}-panel`;

          return (
            <TabPanel
              id={panelId}
              key={panelId}
              content={content}
              isActive={activeTabId === id}
              tabId={tabId}
            />
          );
        })}
      </div>
    </div>
  );
};

const TabList = ({ activeTabId, onChangeActiveTab, tabs }: TabListProps) => {
  const tabRefs = useRef<Map<string, HTMLButtonElement | null>>(new Map());

  const onFocusTab = (id: string) => {
    const tabsMap = tabRefs.current;
    const tabEl = tabsMap.get(id);

    tabEl?.focus();
  };

  const focusAndSelectTab = (tabId: string) => {
    onFocusTab(tabId);
    onChangeActiveTab(tabId);
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    position: number,
  ) => {
    const key = event.key;
    const lastElementIndex = tabs.length - 1;

    switch (key) {
      case "Home": {
        const nextTab = tabs[0];

        event.preventDefault();
        focusAndSelectTab(nextTab.id);

        break;
      }

      case "End": {
        const nextTab = tabs[lastElementIndex];

        event.preventDefault();
        focusAndSelectTab(nextTab.id);

        break;
      }

      case "ArrowRight": {
        const nextTabIndex = position === lastElementIndex ? 0 : position + 1;
        const nextTab = tabs[nextTabIndex];

        event.preventDefault();
        focusAndSelectTab(nextTab.id);

        break;
      }

      case "ArrowLeft": {
        const prevTabIndex = position === 0 ? lastElementIndex : position - 1;
        const prevTab = tabs[prevTabIndex];

        event.preventDefault();
        focusAndSelectTab(prevTab.id);

        break;
      }

      default:
        break;
    }
  };

  return (
    <div className="tab-list" role="tablist">
      {tabs.map(({ id, label }, index) => {
        const tabId = `${id}-tab`;
        const panelId = `${id}-panel`;

        return (
          <TabItem
            id={tabId}
            isActive={activeTabId == id}
            key={tabId}
            label={label}
            onClick={() => focusAndSelectTab(id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            panelId={panelId}
            ref={(ref) => {
              tabRefs.current.set(id, ref);
            }}
          />
        );
      })}
    </div>
  );
};

const TabItem = forwardRef<HTMLButtonElement, TabItemProps>(
  ({ id, label, isActive, onClick, onKeyDown, panelId }: TabItemProps, ref) => {
    return (
      <button
        aria-selected={isActive}
        aria-controls={panelId}
        className={`tab-item ${isActive ? "tab-item-active" : ""}`}
        id={id}
        onClick={onClick}
        onKeyDown={onKeyDown}
        ref={ref}
        role="tab"
        tabIndex={isActive ? 0 : -1}
      >
        {label}
      </button>
    );
  },
);

const TabPanel = ({ id, content, isActive, tabId }: TabPanelProps) => {
  return (
    <div
      aria-labelledby={tabId}
      id={id}
      role="tabpanel"
      hidden={!isActive}
      tabIndex={0}
    >
      {content}
    </div>
  );
};

export default function App() {
  return (
    <main>
      <h2>Tabs</h2>

      <Tabs
        tabs={[
          {
            id: "html",
            label: "HTML",
            content:
              "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.",
          },
          {
            id: "css",
            label: "CSS",
            content:
              "Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.",
          },
          {
            id: "javascript",
            label: "JavaScript",
            content:
              "JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.",
          },
        ]}
      />
    </main>
  );
}
