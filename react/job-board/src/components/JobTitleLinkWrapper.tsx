import type { FC, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  url?: string;
}

const JobTitleWrapper: FC<Props> = ({ url, children }) => {
  if (!url) {
    return children;
  }

  return (
    <a href={url} className="cursor-pointer" target="_blank">
      {children}
    </a>
  );
};

export default JobTitleWrapper;
