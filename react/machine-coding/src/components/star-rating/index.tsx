import { useState, type MouseEvent } from "react";
import "./styles.css";

type FillStatus = "empty" | "half" | "full";

interface StarFilledProps {
  fill: FillStatus;
}

interface StarRatingProps {
  totalStars: number;
  selectedRating: number;
  onChangeRating: (rating: number) => void;
}

function StarOutline() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="star-icon"
      fill="none"
      viewBox="0 0 24 24"
      stroke="black"
      strokeWidth={1}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  );
}

function StarFilled({ fill }: StarFilledProps) {
  const isEmpty = fill === "empty";
  const isHalf = fill === "half";

  if (isEmpty) {
    return null;
  }

  return (
    <div className="star-filled" style={{ width: isHalf ? "50%" : "100%" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="star-icon star-gold"
        fill={fill}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    </div>
  );
}

const getFillStatus = (rating: number, selectedRating: number): FillStatus => {
  if (selectedRating >= rating) {
    return "full";
  } else if (selectedRating >= rating - 0.5) {
    return "half";
  } else {
    return "empty";
  }
};

function StarRating({
  totalStars,
  selectedRating,
  onChangeRating,
}: StarRatingProps) {
  const [hoveredRating, setHoveredRating] = useState(0);

  const getFinalRating = (
    event: MouseEvent<HTMLDivElement>,
    rating: number,
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const clientX = event.clientX;
    const clientPosition = clientX - rect.left;
    const isLeft = clientPosition < rect.width / 2;

    const finalRating = isLeft ? rating - 0.5 : rating;

    return finalRating;
  };

  const handleOnClick = (event: MouseEvent<HTMLDivElement>, rating: number) => {
    const finalRating = getFinalRating(event, rating);

    onChangeRating(finalRating);
  };

  const handleOnMouseMove = (
    event: MouseEvent<HTMLDivElement>,
    rating: number,
  ) => {
    const finalRating = getFinalRating(event, rating);

    setHoveredRating(finalRating);
  };

  return (
    <div className="star-rating-wrapper">
      <div className="stars-wrapper" onMouseLeave={() => setHoveredRating(0)}>
        {Array.from({ length: totalStars }).map((_, i) => {
          const rating = i + 1;
          const key = `star-${rating}`;
          const activeRating = hoveredRating || selectedRating;
          const fill = getFillStatus(rating, activeRating);

          console.log({ fill });

          return (
            <div
              aria-label={`Rate ${rating} out of ${totalStars}`}
              className="star"
              key={key}
              onClick={(e) => handleOnClick(e, rating)}
              onMouseMove={(e) => handleOnMouseMove(e, rating)}
            >
              <StarOutline />
              <StarFilled fill={fill} />
            </div>
          );
        })}
      </div>

      <button
        aria-label="Reset selected rating"
        onClick={() => onChangeRating(0)}
        type="button"
      >
        Reset
      </button>
    </div>
  );
}

export default function App() {
  const [rating, setRating] = useState(0);

  const onChangeRating = (rating: number) => {
    setRating(rating);
  };

  return (
    <main>
      <p>Rate your interview process</p>

      <StarRating
        totalStars={5}
        selectedRating={rating}
        onChangeRating={onChangeRating}
      />
    </main>
  );
}
