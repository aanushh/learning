import { useEffect, useRef, useState } from "react";
import type { JobDetail } from "../types/job-detail";
import { MAX_JOBS_TO_SHOW } from "../constants/job-id";

const useJobDetails = (jobIds: number[]) => {
  const [isLoading, setIsLoading] = useState(true);
  const [jobDetails, setJobDetails] = useState<JobDetail[]>([]);
  const cachedJobCountRef = useRef(0);
  const [jobsToFetchCount, setJobsToFetchCount] = useState(MAX_JOBS_TO_SHOW);

  useEffect(() => {
    if (jobIds.length === 0) {
      return;
    }

    let shouldIgnoreUpdates = false;

    async function fetchJobData() {
      const jobsToFetch = jobIds.slice(
        cachedJobCountRef.current,
        jobsToFetchCount,
      );

      setIsLoading(true);

      const jobPromises = jobsToFetch.map(async (jobId) => {
        try {
          const response = await fetch(
            `https://hacker-news.firebaseio.com/v0/item/${jobId}.json`,
          );

          if (!response.ok) {
            throw new Error("Unable to fetch");
          }

          const data = (await response.json()) as JobDetail;

          return data;
        } catch (error) {
          console.error(error);
        }

        return undefined;
      });

      const response = await Promise.all(jobPromises);
      const data = response.filter((jobDetail) =>
        Boolean(jobDetail?.title),
      ) as JobDetail[];

      if (!shouldIgnoreUpdates) {
        setJobDetails((prev) => {
          return [...prev, ...data];
        });
      }

      setIsLoading(false);
    }

    fetchJobData();

    return () => {
      shouldIgnoreUpdates = true;
    };
  }, [jobIds, jobsToFetchCount]);

  const onLoadMoreJobs = () => {
    cachedJobCountRef.current = jobsToFetchCount;
    setJobsToFetchCount((prev) => prev + MAX_JOBS_TO_SHOW);
  };

  return {
    isLoading,
    isLoadingMoreJobs: isLoading && jobsToFetchCount > MAX_JOBS_TO_SHOW,
    jobDetails,
    onLoadMoreJobs,
  };
};

export default useJobDetails;
