import React, { useState, useEffect } from 'react';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Avanza al siguiente slide cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images?.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images?.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="flex justify-center items-center z-100">
      <div className="flex justify-center items-center w-[90vw] h-[55vh] overflow-hidden z-10">
        {images?.map((image, index) => (
          <div key={index} className={`absolute rounded-b-2xl justify-center items-center w-[90vw] h-[55vh] ${index === currentIndex ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
            style={{background: `linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,1)), url(${image})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat',backgroundPositionX: 'center' , backgroundPosition: 'center', zIndex: -1}}/>
        ))}
        <div className="absolute flex items-center justify-between w-[98vw] h-[20vh]">
          <button onClick={prevSlide} className="text-[#ff5757] text-4xl md:text-6xl font-bold p-4 focus:outline-none bg-gray-300 me-4 px-2 py-6 rounded-s-lg hover:scale-105">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hover:scale-105">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          </button>
          <button onClick={nextSlide} className="text-[#ff5757] text-4xl md:text-6xl font-bold p-4 focus:outline-none bg-gray-300 ms-4 px-2 py-6 rounded-e-lg hover:scale-105">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hover:scale-105">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
