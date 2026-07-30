import {
  useId,
  useState,
  useEffect,
  Children,
  type ReactNode,
  useRef,
  useCallback,
} from "react";
import "./styles.css";

interface CarouselProps {
  autoPlayInterval: number;
  children: ReactNode;
  loop: boolean;
  showArrows: boolean;
  showDots: boolean;
}

function Carousel({
  autoPlayInterval,
  children,
  loop = false,
  showArrows = false,
  showDots = false,
}: CarouselProps) {
  const id = useId();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const slideShowRef = useRef<number | null>(null);

  const slides = Children.toArray(children);
  const slidesCount = slides.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      const isLastSlide = prev === slidesCount - 1;

      if (!loop && isLastSlide) {
        return prev;
      }

      return isLastSlide ? 0 : prev + 1;
    });
  }, [loop, slidesCount]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      const isFirstSlide = prev === 0;

      if (!loop && isFirstSlide) {
        return prev;
      }

      return isFirstSlide ? slidesCount - 1 : prev - 1;
    });
  }, [loop, slidesCount]);

  useEffect(() => {
    if (!autoPlayInterval || paused || slidesCount <= 1) {
      return;
    }

    slideShowRef.current = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => {
      if (slideShowRef.current) {
        clearInterval(slideShowRef.current);
        slideShowRef.current = null;
      }
    };
  }, [autoPlayInterval, slidesCount, paused]);

  if (slidesCount === 0) {
    return null;
  }

  return (
    <div
      className="carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Image carousel"
      tabIndex={0}
    >
      <div className="carousel-viewport">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={`${id}-${index}`}
              className="carousel-slide"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {showArrows && slidesCount > 1 ? (
        <>
          <button
            aria-label="Previous slide"
            className="carousel-btn"
            onClick={prevSlide}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {"<"}
          </button>
          <button
            aria-label="Next slide"
            className="carousel-btn carousel-btn-next"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onClick={nextSlide}
          >
            {">"}
          </button>
        </>
      ) : null}

      {showDots && slidesCount > 1 ? (
        <div className="carousel-dots" role="tablist">
          {slides.map((_, i) => {
            const position = i + 1;
            const isSelected = i === currentIndex;

            return (
              <button
                aria-label={`Slide ${position}`}
                aria-selected={isSelected}
                className={`carousel-dot ${
                  isSelected ? "carousel-dot-active" : ""
                }`}
                onClick={() => setCurrentIndex(i)}
                key={i}
                role="tab"
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <h1>Carousel</h1>

      <Carousel autoPlayInterval={3000} showArrows loop showDots>
        {[
          "https://images.unsplash.com/photo-1537819191377-d3305ffddce4?q=80&w=1421&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1773691323862-b33577111b0a?q=80&w=1612&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://plus.unsplash.com/premium_photo-1676496046182-356a6a0ed002?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ].map((url) => (
          <img src={url} alt="" loading="lazy" />
        ))}
      </Carousel>
    </div>
  );
}
