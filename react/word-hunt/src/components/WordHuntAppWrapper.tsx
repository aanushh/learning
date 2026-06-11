import type { FC, PropsWithChildren } from "react";

const WordHuntAppWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="flex w-dvw h-dvh justify-center items-center">
      {children}
    </main>
  );
};

export default WordHuntAppWrapper;
