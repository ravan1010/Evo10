import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ImageSliderforAds = ({ images = [], links = [], autoSlide = true, interval = 3000 }) => {
  const total = images.length;
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ Hook is always called, even if images are empty
  useEffect(() => {
    if (!autoSlide || total === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, autoSlide, interval, total]);

  // ✅ This return is after all hooks
  if (total === 0) return null;

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-full my-auto max-w-md mx-auto overflow-hidden">
      <div
        className="flex w-full h-full my-auto transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => {
          const link = links[index] || '/';
          return (
            <a
              key={index}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-auto flex-shrink-0"
            >
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-auto rounded"
              />
            </a>
          );
        })}
      </div>

      {/* Arrows */}
      <button
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
        onClick={prevSlide}
      >
        <FaChevronLeft />
      </button>
      <button
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
        onClick={nextSlide}
      >
        <FaChevronRight />
      </button>

      {/* Dots */}
      <div className="flex justify-center mt-3 border-b-4 space-x-2">
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => goToSlide(index)}
            className={`cursor-pointer text-xl ${
              currentIndex === index ? "text-black" : "text-gray-300"
            }`}
          >
            ●
          </span>
        ))}
      </div>
    </div>
  );
};

export default ImageSliderforAds;
