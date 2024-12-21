import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const HeroCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const images: number[] = [1, 2, 3, 4, 5];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const handlePrevSlide = (): void => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextSlide = (): void => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handleDotClick = (index: number): void => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Image Carousel */}
      <div
        className="relative h-full w-full duration-700 ease-in-out transition-transform"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        <div className="absolute flex h-full w-[500%]">
          {images.map((index: number) => (
            <div key={index} className="relative h-full w-[20%]">
              <img
                src={`/hero/${index}.jpg`}
                alt={`Hero image ${index}`}
                className="h-full w-full object-cover"
              />
              {/* Enhanced gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            </div>
          ))}
        </div>
      </div>

      {/* Modern Content Overlay */}
      <div className="absolute inset-0 flex items-center px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 border border-orange-500/30">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              <span className="text-orange-300 text-sm font-medium tracking-wider uppercase">
                Adventure Awaits
              </span>
            </div>

            {/* Main Heading */}
            <div className="-space-y-4">
              <h1 className="font-[Montserrat] font-black text-[130px] leading-none tracking-tight">
                <span className="block text-white drop-shadow-2xl">DREAM</span>
                <span className="block text-transparent bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text drop-shadow-sm">
                  TREKS
                </span>
              </h1>
            </div>

            {/* Description */}
            <div className="max-w-xl space-y-8">
              <p className="text-xl text-gray-300 leading-relaxed">
                Embark on extraordinary journeys through Earth&apos;s most
                breathtaking landscapes. Discover uncharted paths and create
                unforgettable memories.
              </p>

              {/* CTA Group */}
              <div className="flex items-center gap-6">
                <Link
                  href="#treks"
                  className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-full hover:bg-orange-600 transition-all duration-300 group shadow-lg shadow-orange-500/30"
                >
                  Explore Treks
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <span className="text-gray-400 text-sm">
                  Slide to explore more
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Navigation Dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
        {images.map((_: number, index: number) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            type="button"
            className={`h-1.5 transition-all duration-300 rounded-full ${
              index === currentIndex
                ? "w-12 bg-orange-500"
                : "w-1.5 bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Enhanced Navigation Arrows */}
      <button
        onClick={handlePrevSlide}
        type="button"
        className="absolute left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 hover:bg-black/40 text-white/70 hover:text-white transition-all duration-300 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNextSlide}
        type="button"
        className="absolute right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 hover:bg-black/40 text-white/70 hover:text-white transition-all duration-300 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default HeroCarousel;
