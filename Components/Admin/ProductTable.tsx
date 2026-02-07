"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import { Product } from "@/lib/types/product";

interface ProductTableProps {
  products: Product[];
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, isActive: boolean) => Promise<void>;
}

export default function ProductTable({ products, onDelete, onToggleStatus }: ProductTableProps) {
  const [togglingIds, setTogglingIds] = useState<Set<string>>(new Set());

  const handleToggle = async (product: Product) => {
    setTogglingIds((prev) => new Set(prev).add(product.id));
    try {
      await onToggleStatus(product.id, !product.is_active);
    } finally {
      setTogglingIds((prev) => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }
  };
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500">No products found.</p>
        <Link
          href="/admin/products/new"
          className="text-[#660033] hover:underline mt-2 inline-block"
        >
          Add your first product
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Mobile: Card View */}
      <div className="lg:hidden space-y-3">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex gap-3">
              {/* Image */}
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                {product.images[0] ? (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={64}
                    height={64}
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
                <p className="font-medium text-gray-900 truncate">{product.name}</p>
                <p className="text-sm text-gray-500">{product.category}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-bold text-[#660033]">£{product.price.toFixed(2)}</span>
                  {product.compare_at_price && product.compare_at_price > product.price && (
                    <span className="text-sm text-red-500" style={{ textDecoration: 'line-through', textDecorationColor: 'red', textDecorationThickness: '2px' }}>£{product.compare_at_price.toFixed(2)}</span>
                  )}
                  <button
                    onClick={() => handleToggle(product)}
                    disabled={togglingIds.has(product.id)}
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                      product.is_active
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : "bg-red-100 text-red-800 hover:bg-red-200"
                    } ${togglingIds.has(product.id) ? "opacity-50 cursor-wait" : ""}`}
                  >
                    {togglingIds.has(product.id) ? "..." : product.is_active ? "Active" : "Inactive"}
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <Link
                  href={`/admin/products/${product.id}/edit`}
                  className="p-2 text-gray-500 hover:text-[#660033] hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Pencil size={18} />
                </Link>
                <button
                  onClick={() => onDelete(product.id)}
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
                Product
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                Category
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                Price
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                Stock
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
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      {product.images[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                          No img
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      {product.size && (
                        <p className="text-sm text-gray-500">{product.size}</p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-900">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#660033]">£{product.price.toFixed(2)}</span>
                    {product.compare_at_price && product.compare_at_price > product.price && (
                      <span className="text-sm text-red-500" style={{ textDecoration: 'line-through', textDecorationColor: 'red', textDecorationThickness: '2px' }}>£{product.compare_at_price.toFixed(2)}</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-900">{product.stock}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleToggle(product)}
                    disabled={togglingIds.has(product.id)}
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                      product.is_active
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : "bg-red-100 text-red-800 hover:bg-red-200"
                    } ${togglingIds.has(product.id) ? "opacity-50 cursor-wait" : ""}`}
                  >
                    {togglingIds.has(product.id) ? "..." : product.is_active ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="p-2 text-gray-500 hover:text-[#660033] hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Pencil size={18} />
                    </Link>
                    <button
                      onClick={() => onDelete(product.id)}
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
