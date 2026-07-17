import { useState, forwardRef, useRef, type KeyboardEvent } from "react";

interface Tab {
  id: string;
  label: string;
  content: string;
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs = ({ tabs }: TabsProps) => {
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);

  const updateActiveTabId = (tabId: string) => {
    setActiveTabId(tabId);
  };

  return (
    <div>
      <TabList
        activeTabId={activeTabId}
        tabs={tabs}
        updateActiveTabId={updateActiveTabId}
      />

      <TabPanelWrapper activeTabId={activeTabId} tabs={tabs} />
    </div>
  );
};

interface TabListProps {
  activeTabId: string;
  tabs: Tab[];
  updateActiveTabId: (tabId: string) => void;
}

const TabList = ({ activeTabId, tabs, updateActiveTabId }: TabListProps) => {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const moveFocus = (index: number) => {
    tabRefs.current[index]?.focus();
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    id: string,
  ) => {
    const key = event.key;
    const lastElementIndex = tabs.length - 1;

    switch (key) {
      case "Home": {
        const moveFocusTab = tabs[0];
        moveFocus(0);
        updateActiveTabId(moveFocusTab.id);

        break;
      }

      case "End": {
        const moveFocusTab = tabs[lastElementIndex];
        moveFocus(lastElementIndex);
        updateActiveTabId(moveFocusTab.id);

        break;
      }

      case "ArrowRight": {
        const currentTabIndex = tabs.findIndex((tab) => tab.id === id);
        const moveTabIndex =
          currentTabIndex === lastElementIndex ? 0 : currentTabIndex + 1;
        moveFocus(moveTabIndex);
        updateActiveTabId(tabs[moveTabIndex].id);

        break;
      }

      case "ArrowLeft": {
        const currentTabIndex = tabs.findIndex((tab) => tab.id === id);
        const moveTabIndex =
          currentTabIndex === 0 ? lastElementIndex : currentTabIndex - 1;
        moveFocus(moveTabIndex);
        updateActiveTabId(tabs[moveTabIndex].id);

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
            onClick={() => updateActiveTabId(id)}
            onKeyDown={(e) => handleKeyDown(e, id)}
            panelId={panelId}
            ref={(ref) => {
              tabRefs.current[index] = ref;
            }}
          />
        );
      })}
    </div>
  );
};

interface TabItemProps {
  id: string;
  isActive: boolean;
  label: string;
  panelId: string;
  onClick: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
}

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

interface TabPanelWrapperProps {
  activeTabId: string;
  tabs: Tab[];
}

const TabPanelWrapper = ({ activeTabId, tabs }: TabPanelWrapperProps) => {
  return (
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
  );
};

interface TabPanelProps {
  id: string;
  content: string;
  isActive: boolean;
  tabId: string;
}

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
