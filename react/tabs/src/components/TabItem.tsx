import { type FC, type KeyboardEvent } from "react";
import type { Tab } from "../types/tabs";

interface TabItemProps extends Pick<Tab, "label"> {
  className?: string;
  isActiveTab: boolean;
  onClick: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
  panelId: string;
  ref: (instance: HTMLButtonElement | null) => void;
}

const TabItem: FC<TabItemProps> = ({
  className,
  isActiveTab,
  label,
  onClick,
  onKeyDown,
  panelId,
  ref,
}) => {
  return (
    <button
      role="tab"
      type="button"
      ref={ref}
      className={className}
      aria-selected={isActiveTab}
      aria-controls={panelId}
      tabIndex={isActiveTab ? 0 : -1}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {label}
    </button>
  );
};

export default TabItem;
