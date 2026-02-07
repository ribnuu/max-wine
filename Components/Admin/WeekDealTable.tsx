"use client";
import Link from "next/link";
import Image from "next/image";
import { Pencil, Trash2, GripVertical } from "lucide-react";
import { WeekDeal } from "@/lib/types/weekDeal";

interface WeekDealTableProps {
  deals: WeekDeal[];
  onDelete: (id: string) => void;
}

export default function WeekDealTable({ deals, onDelete }: WeekDealTableProps) {
  if (deals.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500">No week deals found.</p>
        <Link
          href="/admin/week-deals/new"
          className="text-[#660033] hover:underline mt-2 inline-block"
        >
          Add your first deal
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Mobile: Card View */}
      <div className="lg:hidden space-y-3">
        {deals.map((deal) => (
          <div key={deal.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex gap-3">
              {/* Image */}
              <div className="w-20 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                {deal.image ? (
                  <Image
                    src={deal.image}
                    alt={deal.title}
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
                <p className="font-medium text-gray-900 truncate">{deal.title}</p>
                <p className="text-sm text-gray-500 truncate">{deal.link}</p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    deal.is_active
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {deal.is_active ? "Active" : "Inactive"}
                  </span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    deal.is_clickable
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    {deal.is_clickable ? "Clickable" : "Not Clickable"}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <Link
                  href={`/admin/week-deals/${deal.id}/edit`}
                  className="p-2 text-gray-500 hover:text-[#660033] hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Pencil size={18} />
                </Link>
                <button
                  onClick={() => onDelete(deal.id)}
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
                Deal
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                Link
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                Status
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                Clickable
              </th>
              <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {deals.map((deal) => (
              <tr key={deal.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-gray-400">
                    <GripVertical size={16} />
                    <span className="text-sm font-medium">{deal.sort_order}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      {deal.image ? (
                        <Image
                          src={deal.image}
                          alt={deal.title}
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
                      <p className="font-medium text-gray-900">{deal.title}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {deal.link}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      deal.is_active
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {deal.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      deal.is_clickable
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {deal.is_clickable ? "Yes" : "No"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/week-deals/${deal.id}/edit`}
                      className="p-2 text-gray-500 hover:text-[#660033] hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Pencil size={18} />
                    </Link>
                    <button
                      onClick={() => onDelete(deal.id)}
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
