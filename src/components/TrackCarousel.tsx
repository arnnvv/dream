import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Mountain } from 'lucide-react';
import { Treck } from '@/lib/db/schema';

interface TrekImage {
    imageUrl: string;
}

interface ImagesByTrekId {
    [key: string]: TrekImage[];
}

interface FeaturedTreksCarouselProps {
    treks: Treck[];
    imagesByTrekId: ImagesByTrekId;
}

const FeaturedTreksCarousel: React.FC<FeaturedTreksCarouselProps> = ({
    treks = [],
    imagesByTrekId = {}
}) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    const nextSlide = (): void => {
        if (!isAnimating) {
            setIsAnimating(true);
            setCurrentIndex((prev) => (prev + 1) % Math.max(0, treks.length - 2));
        }
    };

    const prevSlide = (): void => {
        if (!isAnimating) {
            setIsAnimating(true);
            setCurrentIndex((prev) => (prev === 0 ? Math.max(0, treks.length - 3) : prev - 1));
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => setIsAnimating(false), 500);
        return () => clearTimeout(timer);
    }, [currentIndex]);

    return (
        <section className="py-32 relative overflow-hidden bg-gradient-to-br from-orange-50 to-red-50">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-64 h-64 bg-orange-300/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-red-300/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-8 relative">
                {/* Section Header */}
                <div className="text-center mb-24">
                    <h2 className="text-6xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
                        Featured Treks
                    </h2>
                    <div className="w-32 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto" />
                </div>

                {/* Carousel Container */}
                <div className="relative">
                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-lg text-orange-500 hover:text-orange-600 transition-all duration-300 hover:scale-110"
                        type="button"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-lg text-orange-500 hover:text-orange-600 transition-all duration-300 hover:scale-110"
                        type="button"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>

                    {/* Cards Container */}
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-out"
                            style={{
                                transform: `translateX(-${currentIndex * (100 / 3)}%)`,
                            }}
                        >
                            {treks.map((trek) => (
                                <div
                                    key={trek.id}
                                    className="w-1/3 flex-shrink-0 px-4"
                                >
                                    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                                        {/* Image Container */}
                                        <div className="relative h-96 overflow-hidden">
                                            {imagesByTrekId[trek.id]?.[0] ? (
                                                <img
                                                    src={imagesByTrekId[trek.id][0].imageUrl}
                                                    alt={trek.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                                                    <Mountain className="w-24 h-24 text-orange-300" />
                                                </div>
                                            )}

                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                        </div>

                                        {/* Content */}
                                        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                            <div className="flex items-center gap-2 mb-4">
                                                <Calendar className="w-5 h-5" />
                                                <span className="text-lg">
                                                    {new Date(trek.createdAt).toLocaleDateString('en-US', {
                                                        month: 'long',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </span>
                                            </div>

                                            <h3 className="text-3xl font-bold mb-2 group-hover:text-orange-300 transition-colors">
                                                {trek.title}
                                            </h3>

                                            {/* Trek Link - Full Card Clickable */}
                                            <a
                                                href={`/treks/${trek.id}`}
                                                className="absolute inset-0"
                                                aria-label={`View details for ${trek.title}`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Carousel Indicators */}
                <div className="flex justify-center gap-2 mt-8">
                    {Array.from({ length: Math.max(0, treks.length - 2) }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            type="button"
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index
                                ? 'bg-orange-500 w-8'
                                : 'bg-orange-200 hover:bg-orange-300'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedTreksCarousel;