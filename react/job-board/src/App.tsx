import { useEffect, useState, type FC } from "react";
import JobBoard from "./components/JobBoard";

const App: FC = () => {
  const [jobIds, setJobIds] = useState<number[]>([]);

  useEffect(() => {
    let shouldIgnoreUpdates = false;

    async function fetchJobIds() {
      try {
        const response = await fetch(
          "https://hacker-news.firebaseio.com/v0/jobstories.json",
        );

        if (!response.ok) {
          throw new Error("Unable to fetch");
        }

        const data = (await response.json()) as number[];

        if (!shouldIgnoreUpdates) {
          setJobIds(data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchJobIds();

    return () => {
      shouldIgnoreUpdates = true;
    };
  }, []);

  return (
    <main className="flex justify-center w-full">
      <div className="w-1/2">
        <h1 className="text-orange-500 text-3xl font-bold my-4">
          Hacker News Jobs Board
        </h1>

        <JobBoard jobIds={jobIds} />
      </div>
    </main>
  );
};

export default App;
