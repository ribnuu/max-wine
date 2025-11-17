"use client";
import { useState } from "react";

const categories = [
  "All",
  "Spirits",
  "Wines",
  "Beers & Ciders",
  "Ready to Drink",
  "Low and No",
  "Soft Drinks",
  "Snacks",
];

const productsData = [
  {
    id: 1,
    name: "Gin Premium",
    category: "Spirits",
    price: 19.99,
    image: "/images/gin.png",
  },
  {
    id: 2,
    name: "Vodka Special",
    category: "Spirits",
    price: 15.99,
    image: "/images/vodka.png",
  },
  {
    id: 3,
    name: "Classic Red Wine",
    category: "Wines",
    price: 12.49,
    image: "/images/redwine.png",
  },
  {
    id: 4,
    name: "Fresh Apple Cider",
    category: "Beers & Ciders",
    price: 4.99,
    image: "/images/cider.png",
  },
  {
    id: 5,
    name: "Whiskey Mini Shot",
    category: "Spirits",
    price: 7.99,
    image: "/images/whiskey.png",
  },
  {
    id: 6,
    name: "Energy Drink",
    category: "Soft Drinks",
    price: 2.49,
    image: "/images/energy.png",
  },
  {
    id: 7,
    name: "Crispy Salted Chips",
    category: "Snacks",
    price: 1.99,
    image: "/images/chips.png",
  },
];

export default function HomePage() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("");

  // Filter Logic
  let filtered = productsData.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (category !== "All") {
    filtered = filtered.filter((p) => p.category === category);
  }

  // Sorting Logic
  if (sortType === "low-high") filtered.sort((a, b) => a.price - b.price);
  if (sortType === "high-low") filtered.sort((a, b) => b.price - a.price);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-6 text-red-700">Our Products</h1>

      {/* Search + Sorting */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-3 border rounded-lg shadow"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="p-3 border rounded-lg shadow"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="low-high">Price: Low → High</option>
          <option value="high-low">Price: High → Low</option>
        </select>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`p-4 font-medium rounded-xl transition shadow 
              ${
                category === cat
                  ? "bg-red-600 text-white"
                  : "bg-red-700 text-white hover:bg-red-600"
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-[1.02] transition"
          >
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="h-full object-contain"
              />
            </div>

            <div className="p-4">
              <h3 className="font-bold text-lg text-red-700 mb-1">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm mb-2">{product.category}</p>
              <p className="text-red-700 font-bold text-xl">£{product.price}</p>

              <button className="w-full mt-3 bg-red-700 text-white py-2 rounded-lg hover:bg-red-600 transition">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filtered.length === 0 && (
        <p className="text-center text-xl text-gray-600 mt-10">
          No products found.
        </p>
      )}
    </div>
  );
}
