import React, { useState } from "react";
import { X, Zap, Crown, Rocket } from "lucide-react";

const boostPlans = [
  {
    id: "basic",
    name: "Basic Boost",
    days: 3,
    price: 10,
    icon: Zap,
    color: "from-blue-500 to-blue-600",
    features: ["Pin to top for 3 days", "Boost badge", "Higher search ranking"],
  },
  {
    id: "premium",
    name: "Premium Boost",
    days: 7,
    price: 20,
    icon: Crown,
    color: "from-purple-500 to-purple-600",
    features: [
      "Pin to top for 7 days",
      "Premium badge",
      "Homepage featured",
      "Priority in search",
    ],
    popular: true,
  },
  {
    id: "ultimate",
    name: "Ultimate Boost",
    days: 14,
    price: 35,
    icon: Rocket,
    color: "from-orange-500 to-red-600",
    features: [
      "Pin to top for 14 days",
      "Ultimate badge",
      "Homepage hero spot",
      "Cross-category promotion",
    ],
  },
];

export function BoostListingModal({ isOpen, onClose, onBoost, listingTitle }) {
  const [selectedPlan, setSelectedPlan] = useState("premium");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleBoost = async () => {
    const plan = boostPlans.find((p) => p.id === selectedPlan);
    if (!plan) return;

    setLoading(true);
    try {
      await onBoost(plan.days, plan.id);
      onClose();
    } catch (error) {
      console.error("Failed to boost listing:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Boost Your Listing
              </h2>
              <p className="text-gray-600 mt-1">
                Get more visibility for: {listingTitle}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="p-6">
          <div className="grid gap-4">
            {boostPlans.map((plan) => {
              const Icon = plan.icon;
              const isSelected = selectedPlan === plan.id;

              return (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`relative p-6 rounded-xl border-2 transition-all text-left ${
                    isSelected
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${plan.color} rounded-xl flex items-center justify-center`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-gray-900">{plan.name}</h3>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">
                            ₹{plan.price}
                          </div>
                          <div className="text-sm text-gray-600">
                            {plan.days} days
                          </div>
                        </div>
                      </div>

                      <ul className="space-y-1">
                        {plan.features.map((feature, index) => (
                          <li
                            key={index}
                            className="text-sm text-gray-600 flex items-center space-x-2"
                          >
                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="absolute top-4 right-4">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Benefits */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl">
            <h4 className="font-semibold text-gray-900 mb-2">
              Why boost your listing?
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span>3x more visibility</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span>Sell 5x faster</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span>Top of search results</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span>Homepage featured</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex space-x-4">
            <button
              onClick={onClose}
              className="flex-1 bg-white text-gray-700 py-3 px-4 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleBoost}
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-emerald-700 transition-all disabled:opacity-50"
            >
              {loading
                ? "Processing..."
                : `Boost for ₹${
                    boostPlans.find((p) => p.id === selectedPlan)?.price
                  }`}
            </button>
          </div>

          <p className="text-center text-xs text-gray-500 mt-3">
            Payment will be processed securely via UPI
          </p>
        </div>
      </div>
    </div>
  );
}
