import React, { createContext, useContext, useState } from "react";

const ListingsContext = createContext(undefined);

export function useListings() {
  const context = useContext(ListingsContext);
  if (context === undefined) {
    throw new Error("useListings must be used within a ListingsProvider");
  }
  return context;
}

// Mock listings data
const mockListings = [
  {
    id: "1",
    ownerId: "1",
    ownerName: "Arjun Sharma",
    title: "Engineering Mathematics Textbook - Semester 3",
    description:
      "Excellent condition textbook for Engineering Mathematics. All chapters covered with solved examples. No highlighting or writing inside.",
    category: "Books",
    condition: "like-new",
    price: 450,
    type: "sell",
    images: [
      "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    tags: ["engineering", "mathematics", "semester3", "textbook"],
    status: "active",
    boostedUntil: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    campusId: "lpu",
    createdAt: "2024-01-20T10:30:00Z",
    updatedAt: "2024-01-20T10:30:00Z",
    location: "Block A, Room 203",
  },
  {
    id: "2",
    ownerId: "1",
    ownerName: "Arjun Sharma",
    title: "Mountain Bike - Hero Sprint",
    description:
      "21-speed mountain bike in great condition. Perfect for campus commuting and weekend rides. Recently serviced.",
    category: "Vehicles",
    condition: "good",
    price: 8500,
    type: "sell",
    images: [
      "https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    tags: ["bike", "mountain", "hero", "transport"],
    status: "active",
    campusId: "lpu",
    createdAt: "2024-01-19T15:20:00Z",
    updatedAt: "2024-01-19T15:20:00Z",
    location: "Cycle Stand near Hostel",
  },
  {
    id: "3",
    ownerId: "1",
    ownerName: "Priya Singh",
    title: "MacBook Air M1 - 8GB/256GB",
    description:
      "Lightly used MacBook Air with M1 chip. Perfect for coding and design work. Comes with original charger and box.",
    category: "Electronics",
    condition: "like-new",
    price: 65000,
    type: "sell",
    images: [
      "https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    tags: ["laptop", "macbook", "apple", "m1", "programming"],
    status: "active",
    campusId: "lpu",
    createdAt: "2024-01-18T09:15:00Z",
    updatedAt: "2024-01-18T09:15:00Z",
    location: "Block B",
  },
  {
    id: "4",
    ownerId: "1",
    ownerName: "Arjun Sharma",
    title: "Study Table with Chair",
    description:
      "Wooden study table with drawer and matching chair. Great for dorm room setup.",
    category: "Furniture",
    condition: "good",
    price: 2500,
    type: "rent",
    rentTerms: {
      period: "semester",
      deposit: 1000,
    },
    images: [
      "https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    tags: ["furniture", "table", "chair", "study", "room"],
    status: "active",
    campusId: "lpu",
    createdAt: "2024-01-17T11:45:00Z",
    updatedAt: "2024-01-17T11:45:00Z",
    location: "Near Library",
  },
];

export function ListingsProvider({ children }) {
  const [listings, setListings] = useState(mockListings);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sortBy, setSortBy] = useState("recent");
  const [loading, setLoading] = useState(false);

  const createListing = async (listingData) => {
    setLoading(true);
    try {
      const newListing = {
        ...listingData,
        id: Date.now().toString(),
        ownerId: "1", // Would come from auth context
        ownerName: "Current User",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setListings((prev) => [newListing, ...prev]);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateListing = async (id, updates) => {
    setListings((prev) =>
      prev.map((listing) =>
        listing.id === id
          ? { ...listing, ...updates, updatedAt: new Date().toISOString() }
          : listing
      )
    );
  };

  const deleteListing = async (id) => {
    setListings((prev) => prev.filter((listing) => listing.id !== id));
  };

  const boostListing = async (id, days) => {
    const boostedUntil = new Date(
      Date.now() + days * 24 * 60 * 60 * 1000
    ).toISOString();
    await updateListing(id, { boostedUntil });
  };

  const getFilteredListings = () => {
    let filtered = [...listings];

    if (searchQuery) {
      filtered = filtered.filter(
        (listing) =>
          listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          listing.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          listing.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    if (selectedCategory && selectedCategory !== "All") {
      filtered = filtered.filter(
        (listing) => listing.category === selectedCategory
      );
    }

    filtered = filtered.filter(
      (listing) =>
        listing.price >= priceRange[0] && listing.price <= priceRange[1]
    );

    filtered = filtered.filter((listing) => listing.status === "active");

    filtered.sort((a, b) => {
      const aIsBoosted =
        a.boostedUntil && new Date(a.boostedUntil) > new Date();
      const bIsBoosted =
        b.boostedUntil && new Date(b.boostedUntil) > new Date();

      if (aIsBoosted && !bIsBoosted) return -1;
      if (!aIsBoosted && bIsBoosted) return 1;

      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "recent":
        default:
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      }
    });

    return filtered;
  };

  const getUserListings = (userId) => {
    return listings.filter((listing) => listing.ownerId === userId);
  };

  return (
    <ListingsContext.Provider
      value={{
        listings,
        searchQuery,
        selectedCategory,
        priceRange,
        sortBy,
        loading,
        createListing,
        updateListing,
        deleteListing,
        boostListing,
        setSearchQuery,
        setSelectedCategory,
        setPriceRange,
        setSortBy,
        getFilteredListings,
        getUserListings,
      }}
    >
      {children}
    </ListingsContext.Provider>
  );
}
