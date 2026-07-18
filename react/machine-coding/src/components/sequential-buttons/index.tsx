import { useId, useState, useMemo, useRef, useEffect } from "react";

/**
 * 8 buttons, once clicked, it should be highlighted to green color
 * once all buttons are clicked, reset. The reset should happen in the
 * clicked order. There should be a 1 sec delay in change.
 */

interface SequentialButtonsProps {
  totalButtons: number;
}

function SequentialButtons({ totalButtons }: SequentialButtonsProps) {
  const id = useId();
  const [clickedOrder, setClickedOrder] = useState<number[]>([]);
  const [isResetting, setIsResetting] = useState(false);
  const clicked = useMemo(() => new Set(clickedOrder), [clickedOrder]);
  const intervalRef = useRef<number | null>(null);

  const handleResetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsResetting(false);
    }
  };

  useEffect(() => {
    if (clickedOrder.length === totalButtons && !intervalRef.current) {
      handleResetClickedButtons();
      setIsResetting(true);
    }

    return () => {
      if (clickedOrder.length === 0) {
        handleResetInterval();
      }
    };
  }, [clickedOrder.length, totalButtons]);

  const handleResetClickedButtons = () => {
    let count = 0;
    intervalRef.current = window.setInterval(() => {
      setClickedOrder((prev) => {
        const next = [...prev];
        next.shift();
        return next;
      });

      count++;

      if (count === totalButtons) {
        handleResetInterval();
      }
    }, 1000);
  };

  const handleOnClickButton = (index: number) => {
    if (isResetting) {
      return;
    }

    setClickedOrder((prev) => {
      if (!prev.includes(index)) {
        return [...prev, index];
      }

      return prev;
    });
  };

  return (
    <div className="buttons-container">
      {Array.from({ length: totalButtons }).map((_, index) => {
        const position = index + 1;
        const key = `${id}-${position}`;

        return (
          <button
            aria-label={`Sequentially resetting button ${position}`}
            className={clicked.has(index) ? "selected" : ""}
            key={key}
            onClick={() => handleOnClickButton(index)}
          >
            Button {position}
          </button>
        );
      })}
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <SequentialButtons totalButtons={8} />
    </div>
  );
}
