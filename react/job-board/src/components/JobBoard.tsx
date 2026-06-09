import type { FC } from "react";
import JobCard from "./JobCard";
import useJobDetails from "../hooks/useJobDetails";
import LoadMoreJobsButton from "./LoadMoreJobsButton";

interface Props {
  jobIds: number[];
}

const JobBoard: FC<Props> = ({ jobIds }) => {
  const { isLoading, isLoadingMoreJobs, jobDetails, onLoadMoreJobs } =
    useJobDetails(jobIds);

  if (isLoading && !isLoadingMoreJobs) {
    return <h3 className="text-xl font-semibold text-gray-400">Loading ...</h3>;
  }

  return (
    <section className="mb-8">
      {jobDetails.map((job) => (
        <JobCard
          key={job.id}
          title={job.title}
          postedAt={job.time}
          postedBy={job.by}
          url={job.url}
        />
      ))}

      <LoadMoreJobsButton
        isLoading={isLoadingMoreJobs}
        onClick={onLoadMoreJobs}
        shouldHide={jobIds.length === jobDetails.length}
      />
    </section>
  );
};

export default JobBoard;
