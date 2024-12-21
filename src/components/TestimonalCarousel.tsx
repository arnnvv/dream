import React, { useState, useEffect, useCallback } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Testimonial } from '@/lib/db/schema';

interface TestimonialsCarouselProps {
    testimonials: Testimonial[];
}

const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({ testimonials = [] }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    const nextSlide = useCallback((): void => {
        if (!isAnimating && testimonials.length > 0) {
            setIsAnimating(true);
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }
    }, [isAnimating, testimonials.length]);

    const prevSlide = useCallback((): void => {
        if (!isAnimating && testimonials.length > 0) {
            setIsAnimating(true);
            setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
        }
    }, [isAnimating, testimonials.length]);

    useEffect(() => {
        const timer = setTimeout(() => setIsAnimating(false), 500);
        return () => clearTimeout(timer);
    }, [currentIndex]);

    // Auto-advance the carousel
    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    return (
        <section className="py-32 bg-gradient-to-br from-orange-50 via-orange-100/30 to-white relative overflow-hidden">
            {/* Enhanced Decorative Background */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-[40rem] h-[40rem] bg-orange-200 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[40rem] h-[40rem] bg-orange-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-pulse" />
            </div>

            <div className="container mx-auto px-8 relative">
                {/* Enhanced Header */}
                <div className="text-center mb-24 max-w-3xl mx-auto">
                    <h2 className="text-6xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-8">
                        Adventurer Stories
                    </h2>
                    <div className="w-32 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto" />
                </div>

                {/* Carousel Container */}
                <div className="relative max-w-4xl mx-auto">
                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10 bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-lg text-orange-500 hover:text-orange-600 transition-all duration-300 hover:scale-110"
                        disabled={isAnimating}
                        type="button"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10 bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-lg text-orange-500 hover:text-orange-600 transition-all duration-300 hover:scale-110"
                        disabled={isAnimating}
                        type="button"
                        aria-label="Next testimonial"
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>

                    {/* Testimonial Cards */}
                    <div className="overflow-hidden">
                        <div
                            className="transition-transform duration-500 ease-out flex"
                            style={{
                                transform: `translateX(-${currentIndex * 100}%)`
                            }}
                        >
                            {testimonials.map((testimonial, index) => (
                                <div
                                    key={index}
                                    className="w-full flex-shrink-0"
                                >
                                    <div className="bg-white/80 backdrop-blur-xl p-12 rounded-3xl shadow-xl">
                                        {/* Quote Icon */}
                                        <div className="flex justify-center mb-8">
                                            <div className="bg-gradient-to-r from-orange-500 to-red-500 w-16 h-16 rounded-full flex items-center justify-center">
                                                <Quote className="w-8 h-8 text-white" />
                                            </div>
                                        </div>

                                        {/* Review Text */}
                                        <blockquote className="text-2xl text-gray-700 italic mb-12 text-center leading-relaxed">
                                            &quot;{testimonial.review}&quot;
                                        </blockquote>

                                        {/* Profile Section */}
                                        <div className="flex flex-col items-center">
                                            <img
                                                src={testimonial.image ?? "/api/placeholder/100/100"}
                                                alt={testimonial.name}
                                                className="w-20 h-20 rounded-full ring-4 ring-orange-100 shadow-lg mb-4"
                                            />
                                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                                {testimonial.name}
                                            </h3>
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className="w-6 h-6 fill-orange-400 text-orange-400"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Carousel Indicators */}
                    <div className="flex justify-center gap-3 mt-8">
                        {testimonials.map((_, index) => (
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
            </div>
        </section>
    );
};

export default TestimonialsCarousel;