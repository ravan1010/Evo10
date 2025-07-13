import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


const ImageSlider = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = images.length;

  if (total === 0) return null; // prevent rendering if no images

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
    <div className="relative max-w-md mx-auto overflow-hidden ">

      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            className="w-full flex-shrink-0 h-120 mt-2 object-cover rounded-md"
          />
        ))}
      </div>

      
      {/* Arrows */}
     
      <button className="absolute left-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
      onClick={prevSlide}>
        <FaChevronLeft />
      </button>


      <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
        onClick={nextSlide}>
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

export default ImageSlider;
