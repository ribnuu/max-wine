"use client";
import { useState } from "react";

// =========================
// PRODUCT DATA (20 ITEMS)
// =========================

const eLiquidProducts = [
  {
    id: 1,
    name: "Blueberry Ice",
    price: 8.99,
    image:
      "/E-liquids/Hayati_pro_max E-liquids/Berry_Lemonade_Hayati_Pro_Max_Nic_Salts_1f64133b-1f3c-491d-809b-3e49837817fa.jpg",
    strength: "20mg",
    size: "10ml",
    flavor: "Fruit",
  },
  {
    id: 2,
    name: "Mint Blast",
    price: 9.49,
    image: "/E-liquids/APPLE_BERRY_BLAST.jpg",
    strength: "10mg",
    size: "10ml",
    flavor: "Menthol",
  },
  {
    id: 3,
    name: "Watermelon Rush",
    price: 9.99,
    image: "/E-liquids/Apple_Peach.jpg",
    strength: "20mg",
    size: "10ml",
    flavor: "Fruit",
  },
  {
    id: 4,
    name: "Tobacco Gold",
    price: 8.49,
    image:
      "/E-liquids/Banana_Ice_Hayati_Pro_Max_Nic_Salts_d22eb4cd-1295-4bcf-b03c-23717b1964d8.jpg",
    strength: "12mg",
    size: "10ml",
    flavor: "Tobacco",
  },
  {
    id: 5,
    name: "Cherry Blast",
    price: 8.99,
    image: "/E-liquids/bar-juice.jpg",
    strength: "10mg",
    size: "10ml",
    flavor: "Fruit",
  },
  {
    id: 6,
    name: "Lemon Freeze",
    price: 9.29,
    image: "/E-liquids/e-liquids-uk-8sYBWtYW3jE-unsplash.jpg",
    strength: "20mg",
    size: "10ml",
    flavor: "Citrus",
  },
  {
    id: 7,
    name: "Cola Ice",
    price: 8.99,
    image: "/E-liquids/elsa-olofsson-kUvpDblvdNM-unsplash.jpg",
    strength: "20mg",
    size: "10ml",
    flavor: "Drink",
  },
  {
    id: 8,
    name: "Strawberry Milk",
    price: 10.49,
    image: "/E-liquids/logoSybmol.jpg",
    strength: "10mg",
    size: "10ml",
    flavor: "Creamy",
  },
  {
    id: 9,
    name: "Peach Ice",
    price: 9.49,
    image:
      "/E-liquids/Mary_liq_Sour_red_e6d0bf0b-8a5b-407a-a1ad-c460ad31f6eb.jpg",
    strength: "20mg",
    size: "10ml",
    flavor: "Fruit",
  },
  {
    id: 10,
    name: "Mango Burst",
    price: 9.99,
    image: "/E-liquids/oleksandr-sekej-9rXVuE9tAR4-unsplash.jpg",
    strength: "20mg",
    size: "10ml",
    flavor: "Tropical",
  },
  {
    id: 11,
    name: "Apple Cool",
    price: 8.79,
    image: "/E-liquids/oleksandr-sekej-ON6nQHwjRjM-unsplash.jpg",
    strength: "10mg",
    size: "10ml",
    flavor: "Fruit",
  },
  {
    id: 12,
    name: "Grape Ice",
    price: 9.59,
    image: "/E-liquids/sierra-alpha-juliet-FQYMp-ezI9w-unsplash.jpg",
    strength: "20mg",
    size: "10ml",
    flavor: "Fruit",
  },
  {
    id: 13,
    name: "Pineapple Twist",
    price: 10.99,
    image: "/E-liquids/sierra-alpha-juliet-H0JfWikvVy0-unsplash.jpg",
    strength: "20mg",
    size: "10ml",
    flavor: "Tropical",
  },
  {
    id: 14,
    name: "Coffee Roast",
    price: 11.49,
    image: "/E-liquids/sierra-alpha-juliet-JFrarg6m8fw-unsplash.jpg",
    strength: "6mg",
    size: "10ml",
    flavor: "Coffee",
  },
  {
    id: 15,
    name: "Vanilla Cream",
    price: 10.29,
    image: "/E-liquids/sierra-alpha-juliet-W8ut-qWZnhs-unsplash.jpg",
    strength: "6mg",
    size: "10ml",
    flavor: "Creamy",
  },
  {
    id: 16,
    name: "Berry Mix",
    price: 9.49,
    image: "/E-liquids/sierra-alpha-juliet-XHJcvEwtrzM-unsplash.jpg",
    strength: "20mg",
    size: "10ml",
    flavor: "Fruit",
  },
  {
    id: 17,
    name: "Kiwi Splash",
    price: 9.19,
    image: "/E-liquids/sierra-alpha-juliet-Yp3EcCP0RZE-unsplash.jpg",
    strength: "10mg",
    size: "10ml",
    flavor: "Fruit",
  },
  {
    id: 18,
    name: "Banana Smooth",
    price: 9.99,
    image: "/E-liquids/elf-liq-1.jpg",
    strength: "10mg",
    size: "10ml",
    flavor: "Creamy",
  },
  {
    id: 19,
    name: "Orange Soda",
    price: 9.79,
    image: "/E-liquids/vapeclubmy-Kwcv9UiImLY-unsplash.jpg",
    strength: "20mg",
    size: "10ml",
    flavor: "Drink",
  },
  {
    id: 20,
    name: "Ice Blast Mix",
    price: 11.99,
    image: "/E-liquids/troy-t-54FVoYE2pc4-unsplash.jpg",
    strength: "20mg",
    size: "10ml",
    flavor: "Menthol",
  },
];

export default function ELiquidProductsPage() {
  const [selected, setSelected] = useState<Product | null>(null); // modal product

  // Define your Product type if not already defined
  type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
    strength: string;
    size: string;
    flavor: string;
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
      {/* PAGE TITLE */}
      <h1 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4 text-red-700">
        E-Liquids & Vapes
      </h1>
      <p className="text-sm sm:text-lg text-gray-600 mb-6 sm:mb-10">
        Browse our wide selection of e-liquids
      </p>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {eLiquidProducts.map((product) => (
          <div key={product.id} className="bg-white p-3 sm:p-6 rounded-lg shadow-lg">
            {/* PRODUCT IMAGE */}
            <div className="h-28 sm:h-40 bg-white rounded flex items-center justify-center p-2">
              <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
            </div>

            {/* TITLE */}
            <h3 className="font-bold mt-2 sm:mt-3 mb-1 text-red-700 text-sm sm:text-base line-clamp-2">{product.name}</h3>

            {/* PRICE */}
            <p className="text-white font-bold text-sm sm:text-lg mb-2 sm:mb-3 bg-red-700 rounded-full px-2 py-0.5 sm:py-1 inline-block">
              £{product.price}
            </p>

            {/* VIEW BUTTON */}
            <button
              onClick={() => setSelected(product)}
              className="w-full mt-2 sm:mt-3 bg-red-700 text-white py-1.5 sm:py-2 rounded-full hover:bg-red-600 transition text-sm sm:text-base"
            >
              View
            </button>
          </div>
        ))}
      </div>

      {/* PRODUCT MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-60 flex items-center justify-center p-3 sm:p-4 z-50">
          <div className="bg-white p-4 sm:p-10 rounded-lg w-full max-w-md shadow-xl relative max-h-[90vh] overflow-y-auto">
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setSelected(null)}
              className="absolute right-3 top-3 text-red-600 text-xl font-bold w-8 h-8 flex items-center justify-center"
            >
              ✕
            </button>

            {/* MODAL IMAGE */}
            <div className="h-40 sm:h-48 bg-white rounded flex items-center justify-center mb-4 p-2">
              <img
                src={selected.image}
                alt={selected.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-red-700 mb-2">
              {selected.name}
            </h2>

            {/* PRODUCT DETAILS */}
            <div className="space-y-1 text-sm sm:text-base">
              <p className="text-gray-700">
                <strong>Price:</strong> £{selected.price}
              </p>
              <p className="text-gray-700">
                <strong>Flavour:</strong> {selected.flavor}
              </p>
              <p className="text-gray-700">
                <strong>Strength:</strong> {selected.strength}
              </p>
              <p className="text-gray-700">
                <strong>Size:</strong> {selected.size}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
