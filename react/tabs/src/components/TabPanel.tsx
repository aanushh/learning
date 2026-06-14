import type { FC } from "react";
import type { Tab } from "../types/tabs";

interface TabPanelProps extends Pick<Tab, "content"> {
  isHidden: boolean;
  panelId: string;
  tabId: string;
}

const TabPanel: FC<TabPanelProps> = ({ content, isHidden, panelId, tabId }) => {
  return (
    <div
      className="tab-panel"
      id={panelId}
      aria-labelledby={tabId}
      hidden={isHidden}
      tabIndex={0}
    >
      {content}
    </div>
  );
};

export default TabPanel;
