import type { FC } from "react";
import JobTitleWrapper from "./JobTitleLinkWrapper";

interface Props {
  title: string;
  postedBy?: string;
  postedAt?: number;
  url?: string;
}

const JobCard: FC<Props> = ({ title, postedAt, postedBy, url }) => {
  return (
    <div className="bg-white rounded-sm p-4 my-4 border border-gray-200">
      <JobTitleWrapper url={url}>
        <p className="text-2xl font-bold mb-2">{title}</p>
      </JobTitleWrapper>

      <div className="flex w-fit gap-2 text-gray-400">
        {postedBy ? <p>By {postedBy}</p> : null}
        <span>•</span>
        {postedAt ? <p>{new Date(postedAt * 1000).toLocaleString()}</p> : null}
      </div>
    </div>
  );
};

export default JobCard;
