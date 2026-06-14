import type { FC } from "react";
import type { Tab } from "../types/tabs";
import TabPanel from "./TabPanel";

interface TabPanelsContainerProps {
  activeTabIdex: number;
  tabs: Tab[];
}

const TabPanelsContainer: FC<TabPanelsContainerProps> = ({
  activeTabIdex,
  tabs,
}) => {
  return (
    <div className="tab-panels-container">
      {tabs.map(({ id, content }, index) => {
        const panelId = `${id}-panel-${index}`;
        const tabId = `${id}-tab-${index}`;

        return (
          <TabPanel
            content={content}
            key={panelId}
            panelId={panelId}
            tabId={tabId}
            isHidden={activeTabIdex !== index}
          />
        );
      })}
    </div>
  );
};

export default TabPanelsContainer;
