"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HeroSlide = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const templates = [
    {
      title: "Premium Wines",
      subtitle: "Discover Exquisite Flavors",
      description:
        "Explore our curated selection of fine wines from world-renowned vineyards",
      background_image: "/Images/wine-978688_1280.jpg",
      is_discount: true,
      discount_percentage: 20,
    },
    {
      title: "Premium Spirits",
      subtitle: "Crafted with Excellence",
      description:
        "Experience the finest whiskeys, vodkas, gins and more from top distilleries",
      background_image: "/Images/alcoholic-beverages-1845295_1280.jpg",
      is_discount: false,
      discount_percentage: 0,
    },
    {
      title: "Beers & Ciders",
      subtitle: "Refreshing Selection",
      description:
        "From craft brews to classic favorites, find your perfect refreshment",
      background_image: "/Images/bar-209148_1280.jpg",
      is_discount: true,
      discount_percentage: 15,
    },
    {
      title: "Vapes & E-Liquids",
      subtitle: "Premium Vaping Experience",
      description:
        "Discover our extensive range of quality vapes and delicious e-liquid flavors",
      background_image: "/Images/AGRPDG2EBRLNHHXDJ2FYVIKXUM.jpg",
      is_discount: true,
      discount_percentage: 25,
    },
    {
      title: "Ready Mixed Drinks",
      subtitle: "Convenience Meets Quality",
      description: "Pre-mixed cocktails and beverages perfect for any occasion",
      background_image: "/Images/bar-4656332_1280.jpg",
      is_discount: false,
      discount_percentage: 0,
    },
    {
      title: "Sweets & Snacks",
      subtitle: "Delicious Treats Await",
      description: "Indulge in our selection of confectionery and tasty snacks",
      background_image: "/Images/colorful-1284475_1280.jpg",
      is_discount: true,
      discount_percentage: 10,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % templates.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [templates.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % templates.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + templates.length) % templates.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide();
    }
    if (touchStart - touchEnd < -75) {
      prevSlide();
    }
  };

  return (
    <div className="bg-linear-to-br from-slate-50 to-blue-50/30">
      <section
        className="relative h-[300px] sm:h-[550px] md:h-[450px] lg:h-[650px] overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute inset-0">
          {templates.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-out ${
                index === currentSlide
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105"
              }`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${slide.background_image})`,
                }}
              >
                <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-transparent"></div>
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/60 lg:hidden"></div>
              </div>

              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              ></div>

              <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
              <div
                className="absolute bottom-32 right-16 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute top-40 right-1/4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl animate-pulse"
                style={{ animationDelay: "2.5s" }}
              ></div>

              <div className="relative h-full flex items-center">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-2xl">
                    {slide.is_discount && (
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-linear-to-r from-orange-500 to-red-500 rounded-full text-xs sm:text-sm font-bold shadow-lg backdrop-blur-sm border border-white/20 animate-pulse mb-4 sm:mb-6">
                        <span className="w-2 h-2 bg-white rounded-full"></span>
                        {slide.discount_percentage}% OFF
                      </div>
                    )}

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-3 sm:mb-4 lg:mb-6 leading-tight text-white drop-shadow-2xl">
                      {slide.title}
                    </h1>

                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/95 font-semibold leading-relaxed mb-3 sm:mb-4 lg:mb-6 drop-shadow-lg">
                      {slide.subtitle}
                    </h2>

                    <p className="hidden sm:block text-base md:text-lg lg:text-xl text-white/80 leading-relaxed drop-shadow-md max-w-xl">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 p-2 sm:p-4 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full transition-all duration-300 ease-out border border-white/30 hover:border-white/50 hover:scale-110 active:scale-95 shadow-xl hover:shadow-2xl hidden sm:flex items-center justify-center z-10"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 p-2 sm:p-4 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full transition-all duration-300 ease-out border border-white/30 hover:border-white/50 hover:scale-110 active:scale-95 shadow-xl hover:shadow-2xl hidden sm:flex items-center justify-center z-10"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        </button>

        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 space-x-2 sm:space-x-3 bg-white/20 backdrop-blur-md rounded-full p-2 sm:p-3 border border-white/30 hidden lg:flex z-10">
          {templates.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ease-out
                ${
                  index === currentSlide
                    ? "bg-white scale-125 shadow-lg"
                    : "bg-white/50 hover:bg-white/70 hover:scale-110"
                }`}
            />
          ))}
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 lg:hidden z-10">
          <div className="flex space-x-2 bg-black/30 backdrop-blur-sm rounded-full px-3 py-2">
            {templates.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300
                  ${
                    index === currentSlide
                      ? "bg-white scale-125 w-6"
                      : "bg-white/50"
                  }`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSlide;
