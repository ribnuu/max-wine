"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import HeroSlideForm from "@/Components/Admin/HeroSlideForm";
import { HeroSlide } from "@/lib/types/heroSlide";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function EditHeroSlidePage() {
  const params = useParams();
  const [slide, setSlide] = useState<HeroSlide | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/hero-slides/${params.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Slide not found");
        return res.json();
      })
      .then((data) => {
        setSlide(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 size={32} className="animate-spin text-[#660033]" />
      </div>
    );
  }

  if (error || !slide) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error || "Slide not found"}</p>
        <Link href="/admin/hero-slides" className="text-[#660033] hover:underline">
          Back to Hero Slides
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <Link
          href="/admin/hero-slides"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#660033] transition-colors text-sm sm:text-base"
        >
          <ArrowLeft size={18} />
          Back to Hero Slides
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-4">Edit Slide</h1>
      </div>

      <HeroSlideForm slide={slide} isEditing />
    </div>
  );
}
