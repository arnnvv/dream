import React from "react";
import { Compass, Tent, Package2, ArrowRight } from "lucide-react";

const TrekkingEquipment = () => {
  const categories = [
    {
      icon: <Package2 />,
      category: "Essential Gear",
      description: "Must-have equipment for every trek",
      items: ["Trekking Poles", "Hiking Boots", "Backpacks", "Sleeping Bags"],
    },
    {
      icon: <Tent />,
      category: "Camping Equipment",
      description: "Everything you need for camping",
      items: ["Tents", "Sleeping Mats", "Camping Stoves", "Headlamps"],
    },
    {
      icon: <Compass />,
      category: "Accessories",
      description: "Essential trekking accessories",
      items: ["Water Bottles", "Trekking Watches", "Compasses", "Gaiters"],
    },
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-orange-50 to-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-100/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-8 relative">
        {/* Rental Badge */}
        <div className="flex justify-center mb-12">
          <div className="bg-orange-100 text-orange-600 px-8 py-3 rounded-full text-lg font-medium inline-flex items-center">
            Available for Rent
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <h2 className="text-6xl font-bold text-gray-800 mb-8">
            Trekking Equipment
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            We provide high-quality trekking equipment for rent to ensure your
            adventure is safe and comfortable. Daily and weekly rental options
            available.
          </p>
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-12 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              {/* Category Header */}
              <div className="text-orange-500 mb-8">
                {React.cloneElement(category.icon, {
                  className: "w-16 h-16",
                })}
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-6">
                {category.category}
              </h3>
              <p className="text-xl text-gray-600 mb-10">
                {category.description}
              </p>

              {/* Items List */}
              <ul className="space-y-6">
                {category.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center text-xl text-gray-700"
                  >
                    <div className="w-2.5 h-2.5 bg-orange-500 rounded-full mr-4" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrekkingEquipment;
