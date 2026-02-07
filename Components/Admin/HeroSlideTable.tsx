"use client";
import Link from "next/link";
import Image from "next/image";
import { Pencil, Trash2, GripVertical } from "lucide-react";
import { HeroSlide } from "@/lib/types/heroSlide";

interface HeroSlideTableProps {
  slides: HeroSlide[];
  onDelete: (id: string) => void;
}

export default function HeroSlideTable({ slides, onDelete }: HeroSlideTableProps) {
  if (slides.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500">No hero slides found.</p>
        <Link
          href="/admin/hero-slides/new"
          className="text-[#660033] hover:underline mt-2 inline-block"
        >
          Add your first slide
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Mobile: Card View */}
      <div className="lg:hidden space-y-3">
        {slides.map((slide) => (
          <div key={slide.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex gap-3">
              {/* Image */}
              <div className="w-20 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                {slide.background_image ? (
                  <Image
                    src={slide.background_image}
                    alt={slide.title}
                    width={80}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                    No img
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{slide.title}</p>
                <p className="text-sm text-gray-500 truncate">{slide.subtitle}</p>
                <div className="flex items-center gap-2 mt-1">
                  {slide.is_discount && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      {slide.discount_percentage}% OFF
                    </span>
                  )}
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    slide.is_active
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {slide.is_active ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <Link
                  href={`/admin/hero-slides/${slide.id}/edit`}
                  className="p-2 text-gray-500 hover:text-[#660033] hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Pencil size={18} />
                </Link>
                <button
                  onClick={() => onDelete(slide.id)}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: Table View */}
      <div className="hidden lg:block bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                Order
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                Slide
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                Subtitle
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                Discount
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                Status
              </th>
              <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {slides.map((slide) => (
              <tr key={slide.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-gray-400">
                    <GripVertical size={16} />
                    <span className="text-sm font-medium">{slide.sort_order}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      {slide.background_image ? (
                        <Image
                          src={slide.background_image}
                          alt={slide.title}
                          width={96}
                          height={56}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                          No img
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{slide.title}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {slide.subtitle}
                </td>
                <td className="px-6 py-4">
                  {slide.is_discount ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      {slide.discount_percentage}% OFF
                    </span>
                  ) : (
                    <span className="text-gray-400 text-sm">None</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      slide.is_active
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {slide.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/hero-slides/${slide.id}/edit`}
                      className="p-2 text-gray-500 hover:text-[#660033] hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Pencil size={18} />
                    </Link>
                    <button
                      onClick={() => onDelete(slide.id)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
