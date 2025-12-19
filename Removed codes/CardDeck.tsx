                <button
                  key={category.name}
                  onClick={() => handleCategoryClick(category.name)}
                  className="bg-[#660033] text-white rounded-xl shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-1 overflow-hidden cursor-pointer min-h-[260px] flex flex-col"
                  style={{
                    transform: isAnimating ? "scale(0.7)" : "scale(1)",
                    transition: "transform 0.4s ease-in-out",
                  }}
                >
                  <div className="relative h-48 bg-linear-to-br from-red-50 to-red-100 flex items-center justify-center">
                    <span className="text-6xl opacity-80">
                      <Image src={category.image} alt={category.name} />
                    </span>
                  </div>
                  <div className="p-4 flex-1 flex items-center justify-center">
                    <h3 className="font-semibold text-white text-lg text-center">
                      {category.name}
                    </h3>
                  </div>
                </button>