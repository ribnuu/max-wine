"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Product, ProductFormData, CATEGORIES } from "@/lib/types/product";
import { WeekDeal } from "@/lib/types/weekDeal";
import ImageUploader from "./ImageUploader";
import { Loader2 } from "lucide-react";

interface ProductFormProps {
  product?: Product;
  isEditing?: boolean;
}

// Offer type options
type OfferType = "none" | "offer" | "2" | "3" | "4" | "5";

const getInitialOfferType = (product?: Product): OfferType => {
  if (product?.offer_quantity) return product.offer_quantity.toString() as OfferType;
  if (product?.compare_at_price && product.compare_at_price > product.price) return "offer";
  return "none";
};

export default function ProductForm({ product, isEditing = false }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [offerType, setOfferType] = useState<OfferType>(getInitialOfferType(product));
  const [weekDeals, setWeekDeals] = useState<WeekDeal[]>([]);
  // Change to true to allow adding new products from the admin panel
  const addProductEnabled = false;

  // Fetch week deals for dropdown
  useEffect(() => {
    fetch("/api/week-deals?includeInactive=true")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setWeekDeals(data);
        }
      })
      .catch(() => {});
  }, []);

  const [formData, setFormData] = useState<ProductFormData>({
    name: product?.name || "",
    price: product?.price || 0,
    compare_at_price: product?.compare_at_price || null,
    offer_quantity: product?.offer_quantity || null,
    offer_price: product?.offer_price || null,
    description: product?.description || "",
    category: product?.category || "Spirits",
    images: product?.images || [],
    stock: product?.stock || 0,
    strength: product?.strength || "",
    size: product?.size || "",
    flavor: product?.flavor || "",
    is_active: product?.is_active ?? true,
    show_price: product?.show_price ?? true,
    is_offer: product?.is_offer ?? false,
    week_deal_id: product?.week_deal_id || null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const url = isEditing ? `/api/products/${product?.id}` : "/api/products";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save product");
      }

      router.push(`/admin?category=${encodeURIComponent(formData.category)}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "number"
          ? parseFloat(value) || 0
          : type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 text-sm sm:text-base">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-4 sm:p-6 space-y-4 sm:space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
            Product Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#660033] focus:border-transparent text-sm sm:text-base"
            placeholder="e.g., Premium Vodka"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Price (£) *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#660033] focus:border-transparent text-sm sm:text-base"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#660033] focus:border-transparent text-sm sm:text-base"
              placeholder="0"
            />
          </div>
        </div>

        {/* Offer Type Selection */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Offer Type
          </label>
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              { value: "none", label: "No Offer" },
              { value: "offer", label: "Offer" },
              { value: "2", label: "2 for" },
              { value: "3", label: "3 for" },
              { value: "4", label: "4 for" },
              { value: "5", label: "5 for" },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setOfferType(option.value as OfferType);
                  // Clear values when switching offer types
                  if (option.value === "none") {
                    setFormData((prev) => ({
                      ...prev,
                      compare_at_price: null,
                      offer_quantity: null,
                      offer_price: null,
                    }));
                  } else if (option.value === "offer") {
                    setFormData((prev) => ({
                      ...prev,
                      offer_quantity: null,
                      offer_price: null,
                    }));
                  } else {
                    setFormData((prev) => ({
                      ...prev,
                      compare_at_price: null,
                      offer_quantity: parseInt(option.value),
                    }));
                  }
                }}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  offerType === option.value
                    ? "bg-[#660033] text-white"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Offer - Single item discount with Was Price */}
          {offerType === "offer" && (
            <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
              <label className="block text-xs text-gray-500 mb-1">
                Was Price (£) - Original price shown crossed out
              </label>
              <input
                type="number"
                name="compare_at_price"
                value={formData.compare_at_price || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    compare_at_price: e.target.value ? parseFloat(e.target.value) : null,
                  }))
                }
                min="0"
                step="0.01"
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#660033] focus:border-transparent text-sm sm:text-base"
                placeholder="e.g., 9.99"
              />
              {formData.compare_at_price && formData.compare_at_price > formData.price && (
                <p className="text-sm text-green-600 mt-2">
                  Preview: <span className="font-bold text-[#660033]">£{formData.price.toFixed(2)}</span>{" "}
                  <span className="text-red-500" style={{ textDecoration: 'line-through', textDecorationColor: 'red', textDecorationThickness: '2px' }}>£{formData.compare_at_price.toFixed(2)}</span>
                </p>
              )}
            </div>
          )}

          {/* Multi-buy offers (2 for, 3 for, etc.) */}
          {["2", "3", "4", "5"].includes(offerType) && (
            <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
              <label className="block text-xs text-gray-500 mb-1">
                {offerType} for £ - Total price for {offerType} items
              </label>
              <input
                type="number"
                name="offer_price"
                value={formData.offer_price || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    offer_price: e.target.value ? parseFloat(e.target.value) : null,
                  }))
                }
                min="0"
                step="0.01"
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#660033] focus:border-transparent text-sm sm:text-base"
                placeholder="e.g., 15.00"
              />
              {formData.offer_price && (
                <p className="text-sm text-green-600 mt-2">
                  Preview: {offerType} for £{formData.offer_price.toFixed(2)}
                </p>
              )}
            </div>
          )}

          {/* No Offer selected */}
          {offerType === "none" && (
            <p className="text-sm text-gray-500 mt-2">
              No special offer - product will show regular price only.
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#660033] focus:border-transparent text-sm sm:text-base"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Week Deal (Optional)
            </label>
            <select
              name="week_deal_id"
              value={formData.week_deal_id || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  week_deal_id: e.target.value || null,
                }))
              }
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#660033] focus:border-transparent text-sm sm:text-base"
            >
              <option value="">No Week Deal</option>
              {weekDeals.map((deal) => (
                <option key={deal.id} value={deal.id}>
                  {deal.title}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Assign this product to a week deal section
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#660033] focus:border-transparent text-sm sm:text-base"
            placeholder="Enter product description..."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Size
            </label>
            <input
              type="text"
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#660033] focus:border-transparent text-sm sm:text-base"
              placeholder="e.g., 700ml"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Strength
            </label>
            <input
              type="text"
              name="strength"
              value={formData.strength}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#660033] focus:border-transparent text-sm sm:text-base"
              placeholder="e.g., 40% or 20mg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Flavour
            </label>
            <input
              type="text"
              name="flavor"
              value={formData.flavor}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#660033] focus:border-transparent text-sm sm:text-base"
              placeholder="e.g., Fruit, Menthol"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
            Images
          </label>
          <ImageUploader
            images={formData.images}
            onChange={(images) => setFormData((prev) => ({ ...prev, images }))}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="is_active"
            id="is_active"
            checked={formData.is_active}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, is_active: e.target.checked }))
            }
            className="w-4 h-4 text-[#660033] border-gray-300 rounded focus:ring-[#660033]"
          />
          <label htmlFor="is_active" className="text-xs sm:text-sm text-gray-700">
            Product is active and visible on the website
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="show_price"
            id="show_price"
            checked={formData.show_price}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, show_price: e.target.checked }))
            }
            className="w-4 h-4 text-[#660033] border-gray-300 rounded focus:ring-[#660033]"
          />
          <label htmlFor="show_price" className="text-xs sm:text-sm text-gray-700">
            Show price tag on the website
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="is_offer"
            id="is_offer"
            checked={formData.is_offer}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, is_offer: e.target.checked }))
            }
            className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
          />
          <label htmlFor="is_offer" className="text-xs sm:text-sm text-gray-700">
            <span className="text-orange-500 font-semibold">OFFER</span> - Show in Offers section
          </label>
        </div>
      </div>

      <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          type="submit"
          disabled={isEditing ? loading : !addProductEnabled || loading}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-[#660033] text-white rounded-lg font-medium hover:bg-[#550028] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          {loading && <Loader2 size={18} className="animate-spin" />}
          {isEditing ? "Update Product" : "Add Product"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm sm:text-base"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
