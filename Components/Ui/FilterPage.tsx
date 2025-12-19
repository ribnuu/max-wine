import { useState } from "react";

const categories = [
  { name: "All" },
  { name: "Spirits" },
  { name: "Wines" },
  { name: "Beers & Ciders" },
  { name: "Ready Mixed Drinks" },
  { name: "Low and No" },
  { name: "E - Liquids" },
  { name: "Snacks" },
];

const allProducts = [
  { id: 1, name: "Gin Premium", category: "Spirits", price: 19.99 },
  { id: 2, name: "Vodka Special", category: "Spirits", price: 15.99 },
  { id: 3, name: "Red Wine Classic", category: "Wines", price: 12.49 },
  { id: 4, name: "Cider Bottle", category: "Beers & Ciders", price: 4.99 },
  { id: 5, name: "Cider Bottle", category: "Beers & Ciders", price: 4.99 },
  { id: 6, name: "Whiskey Mini", category: "Spirits", price: 7.99 },
  { id: 7, name: "Energy Drink", category: "Soft Drinks", price: 2.49 },
  { id: 8, name: "Crispy Chips", category: "Snacks", price: 1.99 },
];

const FilterPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? allProducts
      : allProducts.filter((p) => p.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-red-700">Our Products</h1>

      {/* Category buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className={`p-4 rounded-lg transition ${
              selectedCategory === cat.name
                ? "bg-red-600 text-white"
                : "bg-red-700 text-white hover:bg-red-600"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="h-48 bg-gray-200"></div>
            <div className="p-4">
              <h3 className="font-bold mb-2 text-red-700">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2">
                Category: {product.category}
              </p>
              <p className="text-red-700 font-bold text-xl">£{product.price}</p>
              <button className="w-full mt-3 bg-red-700 text-white py-2 rounded-full hover:bg-red-600 transition">
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterPage;
