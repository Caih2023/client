import React, { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

function ImagenesRecorridos({ galeria }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? galeria.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === galeria.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Cambiar imagen cada 3 segundos

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="max-w-[668px] w-full m-auto relative group px-2">
      <img
        src={galeria[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="w-screen h-[190px] rounded-2xl object-cover duration-500"
      />
      {/* Left Arrow */}
      <div className="Left-Arrow">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className="Right-Arrow">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className="flex justify-center absolute bottom-1 left-0 right-0">
        {galeria.map((imgUrl, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className="text-2xl cursor-pointer mx-1"
          >
            <RxDotFilled
              className={currentIndex === slideIndex ? "active-dot" : ""}
              size={35}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImagenesRecorridos;
