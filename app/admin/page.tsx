"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ProductTable from "@/Components/Admin/ProductTable";
import { Product } from "@/lib/types/product";
import { SiteSettings } from "@/lib/types/siteSettings";
import { PlusCircle, Package, Loader2, Tag, Settings } from "lucide-react";

export default function AdminDashboard() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(categoryFromUrl || "all");
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    // Fetch products
    fetch("/api/products?includeInactive=true")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // Fetch site settings
    fetch("/api/site-settings")
      .then((res) => res.json())
      .then((data) => setSiteSettings(data))
      .catch(() => {});
  }, []);

  // Update filter when URL category changes
  useEffect(() => {
    if (categoryFromUrl) {
      setFilter(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleToggleStatus = async (id: string, isActive: boolean) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: isActive }),
    });
    if (res.ok) {
      setProducts(products.map((p) =>
        p.id === id ? { ...p, is_active: isActive } : p
      ));
    }
  };

  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((p) => p.category === filter);

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div>
      {/* Quick Actions */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
          {siteSettings?.add_product_enabled ? (
            <Link
              href="/admin/products/new"
              className="bg-[#660033] text-white p-4 rounded-lg font-medium hover:bg-[#550028] transition-colors flex flex-col items-center justify-center gap-2 text-center"
            >
              <PlusCircle size={24} />
              <span className="text-sm">Add Product</span>
            </Link>
          ) : (
            <div
              className="bg-gray-400 text-white p-4 rounded-lg font-medium cursor-not-allowed flex flex-col items-center justify-center gap-2 text-center opacity-60"
            >
              <PlusCircle size={24} />
              <span className="text-sm">Add Product</span>
            </div>
          )}
          <Link
            href="/admin/week-deals/new"
            className="bg-green-600 text-white p-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex flex-col items-center justify-center gap-2 text-center"
          >
            <Tag size={24} />
            <span className="text-sm">Add Week Deal</span>
          </Link>
          <Link
            href="/admin/week-deals"
            className="bg-blue-600 text-white p-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex flex-col items-center justify-center gap-2 text-center"
          >
            <Tag size={24} />
            <span className="text-sm">Manage Deals</span>
          </Link>
          <Link
            href="/admin/hero-slides"
            className="bg-purple-600 text-white p-4 rounded-lg font-medium hover:bg-purple-700 transition-colors flex flex-col items-center justify-center gap-2 text-center"
          >
            <Package size={24} />
            <span className="text-sm">Hero Slides</span>
          </Link>
          <Link
            href="/admin/settings"
            className="bg-gray-600 text-white p-4 rounded-lg font-medium hover:bg-gray-700 transition-colors flex flex-col items-center justify-center gap-2 text-center"
          >
            <Settings size={24} />
            <span className="text-sm">Site Settings</span>
          </Link>
        </div>
      </div>

      {/* Header - Stack on mobile */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            {products.length} total products
          </p>
        </div>
        {siteSettings?.add_product_enabled ? (
          <Link
            href="/admin/products/new"
            className="bg-[#660033] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-[#550028] transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <PlusCircle size={18} />
            Add Product
          </Link>
        ) : (
          <div
            className="bg-gray-400 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base opacity-60"
          >
            <PlusCircle size={18} />
            Add Product
          </div>
        )}
      </div>

      {/* Stats Cards - 2 columns on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-[#660033]/10 rounded-lg">
              <Package className="text-[#660033]" size={20} />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Total</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{products.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-green-100 rounded-lg">
              <Package className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Active</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {products.filter((p) => p.is_active).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-red-100 rounded-lg">
              <Package className="text-red-600" size={20} />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Inactive</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {products.filter((p) => !p.is_active).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-orange-100 rounded-lg">
              <Package className="text-orange-600" size={20} />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Low Stock</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {products.filter((p) => p.stock < 10).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter - Scrollable on mobile */}
      <div className="mb-4 sm:mb-6 flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
            filter === "all"
              ? "bg-[#660033] text-white"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
              filter === cat
                ? "bg-[#660033] text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 size={32} className="animate-spin text-[#660033]" />
        </div>
      ) : (
        <ProductTable products={filteredProducts} onDelete={handleDelete} onToggleStatus={handleToggleStatus} />
      )}
    </div>
  );
}
