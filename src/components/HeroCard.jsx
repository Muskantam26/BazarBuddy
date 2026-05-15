import React, { useState, useEffect } from 'react';
import Button1 from './ui/Button1';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const HeroCard = ({ slides = [], showArrows = false }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!slides || slides.length === 0) return null;

  const nextSlide = () => {
    setCurrentSlide(prev => prev === slides.length - 1 ? 0 : prev + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => prev === 0 ? slides.length - 1 : prev - 1);
  };

  return (
    <div className=' w-full h-full px-4 py-3 relative group'>
      <div className='w-full h-full relative overflow-hidden rounded-xl bg-[var(--hero-bg)]'>

        {/* Slider Track */}
        <div
          className='flex transition-transform duration-700 ease-in-out h-full'
          style={{
            width: `${slides.length * 100}%`,
            transform: `translateX(-${currentSlide * (100 / slides.length)}%)`
          }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className='relative h-full flex-shrink-0'
              style={{ width: `${100 / slides.length}%` }}
            >

              {/* Full Background Image */}
              <img
                src={slide.image}
                alt={slide.subtitle}
                className='absolute inset-0 w-full h-full object-cover z-0'
              />

              {/* Overlay Content */}
              <div className='relative z-10 py-24 px-10 w-full h-full flex flex-col justify-center '>
                <div className=''>
                  <p className='text-sm md:text-[15px] font-semibold  tracking-wide uppercase '>
                    {slide.subtitle}
                  </p>
                  <h1 className='text-2xl md:text-3xl mt-5 lg:text-5xl font-extrabold text-[var(--text-heading)]  leading-[1.1] tracking-tight'>
                    {slide.titlePart1} <br />
                    {slide.titlePart2} <span className='text-[var(--primary-color)]'>{slide.titleHighlight}</span>
                  </h1>
                  <p className='text-base md:text-lg mt-5 text-gray-700  max-w-md leading-relaxed font-medium'>
                    {slide.description}
                  </p>

                  <div>
                    <Button1 className='mt-5'>
                      {slide.buttonText || 'Shop Now'}
                    </Button1>
                  </div>

                  {/* Navigation Arrows under the button */}
                  {showArrows && (
                    <div className='flex gap-4 mt-10 '>
                      <button
                        onClick={prevSlide}
                        className='w-11 h-11 rounded-full bg-[var(--primary-color)] text-white flex items-center justify-center hover:bg-[var(--primary-dark)] transition-colors shadow-md'
                        aria-label="Previous slide"
                      >
                        <FiChevronLeft size={24} />
                      </button>
                      <button
                        onClick={nextSlide}
                        className='w-11 h-11 rounded-full bg-[var(--primary-color)] text-white flex items-center justify-center hover:bg-[var(--primary-dark)] transition-colors shadow-md'
                        aria-label="Next slide"
                      >
                        <FiChevronRight size={24} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default HeroCard;