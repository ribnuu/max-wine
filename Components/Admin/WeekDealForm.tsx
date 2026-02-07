"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { WeekDeal, WeekDealFormData } from "@/lib/types/weekDeal";
import ImageUploader from "./ImageUploader";
import { Loader2 } from "lucide-react";

interface WeekDealFormProps {
  deal?: WeekDeal;
  isEditing?: boolean;
}

export default function WeekDealForm({ deal, isEditing = false }: WeekDealFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<WeekDealFormData>({
    title: deal?.title || "",
    image: deal?.image || "",
    link: deal?.link || "/Week-deals",
    is_active: deal?.is_active ?? true,
    is_clickable: deal?.is_clickable ?? true,
    sort_order: deal?.sort_order || 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const url = isEditing ? `/api/week-deals/${deal?.id}` : "/api/week-deals";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save week deal");
      }

      router.push("/admin/week-deals");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#660033] focus:border-transparent text-sm sm:text-base"
            placeholder="e.g., Spirit Of The Week"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
            Link Page
          </label>
          <select
            name="link"
            value={formData.link}
            onChange={handleChange}
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#660033] focus:border-transparent text-sm sm:text-base"
          >
            <option value="/Week-deals">Week Deals</option>
            <option value="/offers">Offers</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
            Image *
          </label>
          <ImageUploader
            images={formData.image ? [formData.image] : []}
            onChange={(images) => setFormData((prev) => ({ ...prev, image: images[0] || "" }))}
            maxImages={1}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
            Sort Order
          </label>
          <input
            type="number"
            name="sort_order"
            value={formData.sort_order}
            onChange={handleChange}
            min="0"
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#660033] focus:border-transparent text-sm sm:text-base"
            placeholder="0"
          />
          <p className="text-xs text-gray-500 mt-1">Lower numbers appear first</p>
        </div>

        <div className="space-y-3">
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
              Deal is active and visible on the website
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_clickable"
              id="is_clickable"
              checked={formData.is_clickable}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, is_clickable: e.target.checked }))
              }
              className="w-4 h-4 text-[#660033] border-gray-300 rounded focus:ring-[#660033]"
            />
            <label htmlFor="is_clickable" className="text-xs sm:text-sm text-gray-700">
              Deal is clickable (users can click to go to link page)
            </label>
          </div>
        </div>
      </div>

      <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          type="submit"
          disabled={loading}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-[#660033] text-white rounded-lg font-medium hover:bg-[#550028] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          {loading && <Loader2 size={18} className="animate-spin" />}
          {isEditing ? "Update Deal" : "Add Deal"}
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
