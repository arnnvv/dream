import React from 'react';
import { Car, Hotel, CheckCircle, MapPin, Clock, CreditCard, Star, Calendar } from 'lucide-react';

const TravelServices = () => {
    const services = [
        {
            icon: <Car className="w-12 h-12" />,
            title: "Taxi Services",
            description: "Comfortable and reliable transportation for your journey",
            features: [
                {
                    icon: <MapPin className="w-6 h-6" />,
                    text: "Pickup from any location"
                },
                {
                    icon: <Clock className="w-6 h-6" />,
                    text: "24/7 service available"
                },
                {
                    icon: <Star className="w-6 h-6" />,
                    text: "Experienced drivers"
                },
                {
                    icon: <CheckCircle className="w-6 h-6" />,
                    text: "All India coverage"
                }
            ],
            buttonText: "Book a Taxi",
            bgGradient: "from-orange-500/20 via-orange-400/10 to-orange-500/5"
        },
        {
            icon: <Hotel className="w-12 h-12" />,
            title: "Hotel Bookings",
            description: "Find the perfect accommodation for your stay",
            features: [
                {
                    icon: <CreditCard className="w-6 h-6" />,
                    text: "Best rates guaranteed"
                },
                {
                    icon: <Star className="w-6 h-6" />,
                    text: "Luxury to budget options"
                },
                {
                    icon: <Calendar className="w-6 h-6" />,
                    text: "Instant confirmation"
                },
                {
                    icon: <CheckCircle className="w-6 h-6" />,
                    text: "Free cancellation"
                }
            ],
            buttonText: "Find Hotels",
            bgGradient: "from-orange-500/20 via-orange-400/10 to-orange-500/5"
        }
    ];

    return (
        <section className="py-32 bg-gradient-to-br from-orange-50 to-white relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-100/30 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-50/30 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-8 relative">
                {/* Header */}
                <div className="text-center mb-24 max-w-3xl mx-auto">
                    <h2 className="text-6xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-8">
                        Travel Services
                    </h2>
                    <div className="w-32 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto" />
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group relative"
                        >
                            {/* Background Effect */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} rounded-3xl transform transition-transform duration-500 group-hover:scale-105`} />

                            {/* Card Content */}
                            <div className="relative bg-white/95 backdrop-blur-sm p-12 rounded-3xl border border-orange-100 shadow-xl">
                                {/* Icon */}
                                <div className="bg-gradient-to-br from-orange-500 to-red-500 w-24 h-24 rounded-3xl flex items-center justify-center mb-8 text-white shadow-lg">
                                    {service.icon}
                                </div>

                                {/* Title & Description */}
                                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                                    {service.title}
                                </h3>
                                <p className="text-xl text-gray-600 mb-10">
                                    {service.description}
                                </p>

                                {/* Features */}
                                <ul className="space-y-6 mb-10">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-4 text-xl text-gray-700">
                                            <div className="text-orange-500">
                                                {feature.icon}
                                            </div>
                                            {feature.text}
                                        </li>
                                    ))}
                                </ul>


                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TravelServices;