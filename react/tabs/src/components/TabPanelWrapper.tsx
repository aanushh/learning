import { useState, type FC } from "react";
import type { Tab } from "../types/tabs";
import TabPanelsContainer from "./TabPanelsContainer";
import TabList from "./TabList";

interface TabPanelWrapperProps {
  defaultTabIndex?: number;
  tabs: Tab[];
}

const TabPanelWrapper: FC<TabPanelWrapperProps> = ({
  defaultTabIndex,
  tabs,
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(defaultTabIndex ?? 0);

  const updateActiveTab = (position: number) => {
    setActiveTabIndex(position);
  };

  return (
    <div className="tab-panel-wrapper">
      <TabList
        activeTabIndex={activeTabIndex}
        tabs={tabs}
        updateActiveTab={updateActiveTab}
      />

      <TabPanelsContainer activeTabIdex={activeTabIndex} tabs={tabs} />
    </div>
  );
};

export default TabPanelWrapper;
