import type { FC } from "react";

interface Props {
  isLoading: boolean;
  onClick: () => void;
  shouldHide: boolean;
}

const LoadMoreJobsButton: FC<Props> = ({ isLoading, onClick, shouldHide }) => {
  if (shouldHide) {
    return null;
  }

  return (
    <button
      className="bg-orange-500 text-white px-3 py-2 rounded-sm cursor-pointer"
      disabled={isLoading}
      onClick={onClick}
    >
      {isLoading ? "Loading ..." : "Load more jobs"}
    </button>
  );
};

export default LoadMoreJobsButton;
