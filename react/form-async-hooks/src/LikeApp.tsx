import { useOptimistic, useState, useTransition, type FC } from "react";

const LikeApp: FC = () => {
  const [liked, setLiked] = useState(false);
  const [optimisticLiked, setOptimisticLiked] = useOptimistic(liked);
  const [isPending, startTransition] = useTransition();

  function onClickLikeButton() {
    startTransition(async () => {
      setOptimisticLiked((liked) => !liked);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLiked((liked) => !liked);
    });
  }

  return (
    <section>
      <button
        onClick={onClickLikeButton}
        style={{
          background: optimisticLiked && !isPending ? "lightskyblue" : "",
        }}
      >
        {optimisticLiked ? "Liked" : "Like"}
      </button>
    </section>
  );
};

export default LikeApp;
