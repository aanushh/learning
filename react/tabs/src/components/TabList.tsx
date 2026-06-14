import { useRef, type FC, type KeyboardEvent } from "react";
import type { Tab } from "../types/tabs";
import TabItem from "./TabItem";

interface TabListProps {
  activeTabIndex: number;
  tabs: Tab[];
  updateActiveTab: (position: number) => void;
}

const TabList: FC<TabListProps> = ({
  activeTabIndex,
  tabs,
  updateActiveTab,
}) => {
  const tabsRef = useRef<HTMLButtonElement[]>([]);

  const moveFocus = (index: number) => {
    tabsRef.current[index]?.focus();
    updateActiveTab(index);
  };

  const handleOnKeyDown = (event: KeyboardEvent, index: number) => {
    const lastIndex = tabs.length - 1;

    switch (event.key) {
      case "ArrowRight": {
        moveFocus(index === lastIndex ? 0 : index + 1);
        break;
      }
      case "ArrowLeft": {
        moveFocus(index === 0 ? lastIndex : index - 1);
        break;
      }
      case "Home": {
        moveFocus(0);
        break;
      }
      case "End": {
        moveFocus(lastIndex);
        break;
      }
      default:
        break;
    }
  };

  return (
    <div className="tablist-wrapper" role="tablist">
      {tabs.map(({ id, label }, index) => {
        const tabId = `${id}-tab-${index}`;
        const panelId = `${id}-panel-${index}`;

        return (
          <TabItem
            className={["tab", activeTabIndex === index && "tab--active"]
              .filter(Boolean)
              .join(" ")}
            isActiveTab={activeTabIndex === index}
            key={tabId}
            label={label}
            onClick={() => updateActiveTab(index)}
            onKeyDown={(e) => handleOnKeyDown(e, index)}
            panelId={panelId}
            ref={(el) => el && (tabsRef.current[index] = el)}
          />
        );
      })}
    </div>
  );
};

export default TabList;
