import React, { useEffect, useRef, useState } from "react";

export default function Carousel({ slides }) {
  const [active, setActive] = useState(1);
  let interval = useRef();

	useEffect(() => {
		start();
		if(interval.current) {
			return () => clearInterval(interval.current)
		}
	}, [])

  function handleNext() {
    stop();
    setActive(active + 1);
  }

  function handlePrev() {
    stop();
    if (active !== 1) {
      setActive(active - 1);
    }
  }

  function start() {
    interval.current = setInterval(() => {
      setActive((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 1000);
  }

  function stop() {
    clearInterval(interval.current);
  }

  return (
    <div className="carousel-container">
      <div className="carousel-inner">
        {slides.map((slide) => {
          return (
            <div
              className={`carousel-item ${active === slide.id ? "active" : ""}`}
              key={slide.id}
            >
              <img src={slide.image} alt="maria ferguson/" />
              <div className="carousel-caption">
                <h2>{slide.name}</h2>
                <p>{slide.title}</p>
                <p>{slide.quote}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="carousel-controls">
        <button
          className="prev-button"
          onClick={() => handlePrev()}
          disabled={active === 1}
        >
          &lt;
        </button>
        <button
          className="next-button"
          onClick={() => handleNext()}
          disabled={active === slides.length - 1}
        >
          &gt;
        </button>
      </div>
      <div className="carousel-indicators">
        <button className="indicator active"></button>
      </div>
    </div>
  );
}
