import React from 'react';
import { Mountain, Trophy, Users, Sparkles } from 'lucide-react';

const AchievementsSection = () => {
    const achievements = [
        {
            icon: <Mountain className="w-16 h-16" />,
            number: "50+",
            title: "Peaks Conquered",
            description: "Successfully guided expeditions to world's highest peaks",
            gradient: "from-orange-500 to-red-500"
        },
        {
            icon: <Trophy className="w-16 h-16" />,
            number: "15",
            title: "Safety Awards",
            description: "Recognized for outstanding safety standards",
            gradient: "from-yellow-500 to-orange-500"
        },
        {
            icon: <Users className="w-16 h-16" />,
            number: "10,000+",
            title: "Happy Trekkers",
            description: "Created memories that last a lifetime",
            gradient: "from-red-500 to-pink-500"
        }
    ];

    return (
        <section className="py-32 relative overflow-hidden bg-gray-50">
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/5" />
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <Sparkles
                        key={i}
                        className={`absolute text-orange-500/20 animate-pulse w-8 h-8
              ${i % 2 === 0 ? 'top-1/4' : 'bottom-1/4'}
              ${i % 3 === 0 ? 'left-1/4' : 'right-1/4'}`}
                        style={{
                            transform: `translate(${i * 50}px, ${i * 30}px)`,
                            animationDelay: `${i * 0.2}s`
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-8 relative">
                <div className="text-center mb-24">
                    <h2 className="text-6xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
                        Our Achievements
                    </h2>
                    <div className="w-32 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {achievements.map((achievement, index) => (
                        <div
                            key={index}
                            className="group relative transform transition-all duration-500 hover:scale-105"
                        >
                            {/* Card background with gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${achievement.gradient} opacity-10 rounded-3xl transform transition-all duration-500 group-hover:opacity-20`} />

                            {/* Main card content */}
                            <div className="relative bg-white/90 backdrop-blur-lg p-12 rounded-3xl border-2 border-orange-100 shadow-xl transition-all duration-500 group-hover:shadow-2xl group-hover:border-orange-200">
                                {/* Icon container with gradient background */}
                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${achievement.gradient} text-white shadow-lg`}>
                                        {achievement.icon}
                                    </div>
                                </div>

                                {/* Content with increased spacing */}
                                <div className="pt-12 text-center">
                                    <div className="text-6xl font-bold bg-gradient-to-br from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
                                        {achievement.number}
                                    </div>
                                    <div className="text-2xl font-bold text-gray-800 mb-4">
                                        {achievement.title}
                                    </div>
                                    <p className="text-lg text-gray-600">
                                        {achievement.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AchievementsSection;