'use client';

import { useState, useEffect } from 'react';

const slides = [
  {
    id: 1,
    title: "National Swimming Championships 2024",
    description: "Join the biggest swimming competition of the year. Registration opens March 1st.",
    image: "https://readdy.ai/api/search-image?query=Professional%20swimming%20pool%20with%20clear%20blue%20water%2C%20competitive%20swimming%20lanes%2C%20modern%20aquatic%20center%2C%20bright%20lighting%2C%20athletes%20preparing%20for%20competition%2C%20clean%20and%20professional%20sports%20facility%20background&width=800&height=400&seq=comp1&orientation=landscape",
    type: "competition"
  },
  {
    id: 2,
    title: "New Aquatic Equipment Collection",
    description: "Discover the latest swimming gear and equipment from top brands.",
    image: "https://readdy.ai/api/search-image?query=Premium%20swimming%20equipment%20display%2C%20goggles%2C%20swimsuits%2C%20training%20gear%2C%20modern%20aquatic%20accessories%2C%20clean%20white%20background%20with%20blue%20accents%2C%20professional%20product%20photography%20style&width=800&height=400&seq=gear1&orientation=landscape",
    type: "equipment"
  },
  {
    id: 3,
    title: "Swimming Technique Masterclass",
    description: "Learn from Olympic coaches and improve your swimming technique.",
    image: "https://readdy.ai/api/search-image?query=Swimming%20instructor%20teaching%20technique%20in%20crystal%20clear%20pool%2C%20professional%20coaching%20session%2C%20modern%20aquatic%20facility%2C%20underwater%20technique%20demonstration%2C%20educational%20swimming%20environment&width=800&height=400&seq=training1&orientation=landscape",
    type: "training"
  }
];

export default function SlideBox() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-2xl">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="w-full h-full bg-cover bg-center relative"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute bottom-8 left-8 text-white max-w-md">
              <h3 className="text-2xl font-bold mb-2">{slide.title}</h3>
              <p className="text-lg mb-4">{slide.description}</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors whitespace-nowrap cursor-pointer">
                Learn More
              </button>
            </div>
          </div>
        </div>
      ))}
      
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors cursor-pointer"
      >
        <div className="w-6 h-6 flex items-center justify-center">
          <i className="ri-arrow-left-line text-xl"></i>
        </div>
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors cursor-pointer"
      >
        <div className="w-6 h-6 flex items-center justify-center">
          <i className="ri-arrow-right-line text-xl"></i>
        </div>
      </button>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors cursor-pointer ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
} 