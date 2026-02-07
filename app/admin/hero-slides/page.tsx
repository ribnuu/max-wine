"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import HeroSlideTable from "@/Components/Admin/HeroSlideTable";
import { HeroSlide } from "@/lib/types/heroSlide";
import { PlusCircle, Image as ImageIcon, Loader2 } from "lucide-react";

export default function HeroSlidesPage() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/hero-slides?includeInactive=true")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSlides(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this slide?")) return;

    const res = await fetch(`/api/hero-slides/${id}`, { method: "DELETE" });
    if (res.ok) {
      setSlides(slides.filter((s) => s.id !== id));
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Hero Slides</h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            {slides.length} total slides
          </p>
        </div>
        <Link
          href="/admin/hero-slides/new"
          className="bg-[#660033] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-[#550028] transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          <PlusCircle size={18} />
          Add Slide
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-[#660033]/10 rounded-lg">
              <ImageIcon className="text-[#660033]" size={20} />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Total</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{slides.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-green-100 rounded-lg">
              <ImageIcon className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Active</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {slides.filter((s) => s.is_active).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-orange-100 rounded-lg">
              <ImageIcon className="text-orange-600" size={20} />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-500">With Discount</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {slides.filter((s) => s.is_discount).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 size={32} className="animate-spin text-[#660033]" />
        </div>
      ) : (
        <HeroSlideTable slides={slides} onDelete={handleDelete} />
      )}
    </div>
  );
}
