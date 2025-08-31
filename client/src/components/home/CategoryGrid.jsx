import React from "react";
import {
  Book,
  Laptop,
  Bike,
  Armchair,
  Shirt,
  Gamepad2,
  PenTool,
  Coffee,
} from "lucide-react";

const categories = [
  {
    name: "Books",
    icon: Book,
    count: "45+",
    color: "bg-blue-100 text-blue-600",
  },
  {
    name: "Electronics",
    icon: Laptop,
    count: "23+",
    color: "bg-purple-100 text-purple-600",
  },
  {
    name: "Vehicles",
    icon: Bike,
    count: "12+",
    color: "bg-green-100 text-green-600",
  },
  {
    name: "Furniture",
    icon: Armchair,
    count: "18+",
    color: "bg-orange-100 text-orange-600",
  },
  {
    name: "Clothing",
    icon: Shirt,
    count: "31+",
    color: "bg-pink-100 text-pink-600",
  },
  {
    name: "Sports",
    icon: Gamepad2,
    count: "9+",
    color: "bg-red-100 text-red-600",
  },
  {
    name: "Stationery",
    icon: PenTool,
    count: "27+",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    name: "Other",
    icon: Coffee,
    count: "15+",
    color: "bg-gray-100 text-gray-600",
  },
];

export function CategoryGrid() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Shop by Category</h2>
        <button
          onClick={() => window.navigateTo?.("/listings")}
          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
        >
          View All →
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.name}
              onClick={() => window.navigateTo?.("/listings")}
              className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 text-center"
            >
              <div
                className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {category.name}
              </h3>
              <p className="text-sm text-gray-600">{category.count} items</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
