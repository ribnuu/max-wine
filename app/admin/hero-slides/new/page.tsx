import HeroSlideForm from "@/Components/Admin/HeroSlideForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewHeroSlidePage() {
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
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-4">Add New Slide</h1>
      </div>

      <HeroSlideForm />
    </div>
  );
}
