"use client";

import React from "react";

const Page = () => {
  const items = [
    {
      id: 1,
      image:
        "https://www.bargainbooze.co.uk/wp-content/uploads/2022/05/Spirits.jpg",
      title: "Spirits",
      category: "498",
    },
    {
      id: 2,
      image:
        "https://www.bargainbooze.co.uk/wp-content/uploads/2022/05/Wine.jpg",
      title: "Wine",
      category: "550",
    },
    {
      id: 3,
      image:
        "https://www.bargainbooze.co.uk/wp-content/uploads/2022/05/Beer.jpg",
      title: "Beer",
      category: "622",
    },
  ];

  const openProducts = (cat: string) => {
    alert(`Open products for category: ${cat}`);
    // Example:
    // router.push(`/products/${cat}`);
  };

  return (
    <div className="p-10 flex justify-center">
      <div className="relative flex gap-4">
        {items.map((item, index) => (
          <div
            key={item.id}
            onClick={() => openProducts(item.category)}
            className="
              group relative w-40 h-56 rounded-xl overflow-hidden cursor-pointer
              shadow-lg transition-all duration-300
              hover:scale-110 hover:z-20
            "
            style={{
              transform: `rotate(${(index - 1) * 4}deg)`,
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:brightness-75"
            />

            <div
              className="
                absolute bottom-0 left-0 right-0 px-2 py-1
                bg-black/50 text-white text-center text-sm
                opacity-0 group-hover:opacity-100 transition-opacity
              "
            >
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
