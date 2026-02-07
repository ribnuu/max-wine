"use client";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import ProductForm from "@/Components/Admin/ProductForm";
import { Product } from "@/lib/types/product";
import { Loader2 } from "lucide-react";

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 size={32} className="animate-spin text-[#660033]" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4 text-sm sm:text-base">{error || "Product not found"}</p>
        <button
          onClick={() => router.push("/admin")}
          className="text-[#660033] hover:underline text-sm sm:text-base"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-8">Edit Product</h1>
      <ProductForm product={product} isEditing />
    </div>
  );
}
