import React, { useState } from "react";
import { Camera, Upload, X, ArrowLeft } from "lucide-react";
import { useListings } from "../../context/ListingsContext";
import { useAuth } from "../../context/AuthContext";

const categories = [
  "Books",
  "Electronics",
  "Vehicles",
  "Furniture",
  "Clothing",
  "Sports",
  "Stationery",
  "Appliances",
  "Services",
  "Other",
];

const conditions = [
  { value: "new", label: "New", desc: "Brand new, unused" },
  {
    value: "like-new",
    label: "Like New",
    desc: "Barely used, excellent condition",
  },
  { value: "good", label: "Good", desc: "Well maintained, minor wear" },
  { value: "fair", label: "Fair", desc: "Shows wear, but functional" },
];

export function CreateListingPage() {
  const { createListing } = useListings();
  const { userProfile } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    condition: "good",
    price: "",
    type: "sell",
    rentPeriod: "",
    rentDeposit: "",
    location: "",
    contactPreference: "chat",
  });
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setImages((prev) => [...prev, imageUrl].slice(0, 6)); // Max 6 images
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const generateTags = () => {
    const title = formData.title.toLowerCase();
    const category = formData.category.toLowerCase();
    const autoTags = [];

    if (title.includes("book") || title.includes("textbook"))
      autoTags.push("book");
    if (title.includes("laptop") || title.includes("macbook"))
      autoTags.push("laptop");
    if (title.includes("bike") || title.includes("cycle"))
      autoTags.push("bike");
    if (category) autoTags.push(category.toLowerCase());

    const manualTags = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    return [...autoTags, ...manualTags];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (
        !formData.title ||
        !formData.description ||
        !formData.category ||
        !formData.price
      ) {
        throw new Error("Please fill in all required fields");
      }

      if (images.length === 0) {
        throw new Error("Please add at least one image");
      }

      const listingData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        condition: formData.condition,
        price: parseInt(formData.price),
        type: formData.type,
        rentTerms:
          formData.type === "rent"
            ? {
                period: formData.rentPeriod,
                deposit: parseInt(formData.rentDeposit) || 0,
              }
            : undefined,
        images:
          images.length > 0
            ? images
            : [
                "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800",
              ],
        tags: generateTags(),
        status: "active",
        campusId: userProfile?.campusId || "lpu",
        location: formData.location || userProfile?.hostel,
      };

      await createListing(listingData);
      window.navigateTo?.("/listings");
    } catch (err) {
      setError(err.message || "Failed to create listing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={() => window.navigateTo?.("/")}
          className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create Listing</h1>
          <p className="text-gray-600">List your item in under 60 seconds</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Images Upload */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Camera className="w-5 h-5 mr-2" />
            Photos (Required)
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}

            {images.length < 6 && (
              <label className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors">
                <Upload className="w-6 h-6 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">Add Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <p className="text-sm text-gray-500 mt-3">
            Add up to 6 photos. First photo will be the main image.
          </p>
        </div>

        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Basic Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Engineering Mathematics Textbook - Semester 3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                placeholder="Describe your item's condition, features, and any important details..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Condition *
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  {conditions.map((condition) => (
                    <option key={condition.value} value={condition.value}>
                      {condition.label} - {condition.desc}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing & Type */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Pricing & Type
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Listing Type *
              </label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, type: "sell" }))
                  }
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                    formData.type === "sell"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  💰 Sell
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, type: "rent" }))
                  }
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                    formData.type === "rent"
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  🔄 Rent
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {formData.type === "sell" ? "Selling Price" : "Rental Price"}{" "}
                  * (₹)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder={formData.type === "sell" ? "2500" : "500"}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {formData.type === "rent" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rental Period
                    </label>
                    <select
                      name="rentPeriod"
                      value={formData.rentPeriod}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Period</option>
                      <option value="daily">Per Day</option>
                      <option value="weekly">Per Week</option>
                      <option value="monthly">Per Month</option>
                      <option value="semester">Per Semester</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Security Deposit (₹)
                    </label>
                    <input
                      type="number"
                      name="rentDeposit"
                      value={formData.rentDeposit}
                      onChange={handleInputChange}
                      placeholder="1000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Additional Details
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g., engineering, mathematics, semester3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">
                Add relevant keywords to help buyers find your item
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pickup Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder={
                  userProfile?.hostel || "e.g., Block A, Near Library"
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Contact Preference
              </label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      contactPreference: "chat",
                    }))
                  }
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                    formData.contactPreference === "chat"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  💬 Chat Only
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      contactPreference: "phone",
                    }))
                  }
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                    formData.contactPreference === "phone"
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  📞 Phone OK
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => window.navigateTo?.("/")}
            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Creating..."
              : `${
                  formData.type === "sell" ? "List for Sale" : "List for Rent"
                }`}
          </button>
        </div>
      </form>
    </div>
  );
}
