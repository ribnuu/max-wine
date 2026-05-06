import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { Product } from "@/lib/types/product";
import ProductOrderBox from "@/Components/Products/ProductOrderBox";

type PageParams = {
  params: Promise<{ id: string }>;
};

async function getProduct(productId: string): Promise<Product | null> {
  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("id", productId)
    .single();

  if (error) {
    // No rows found should render Next.js 404, all other failures should surface as server errors.
    if (error.code === "PGRST116") {
      return null;
    }
    throw new Error(`Failed to fetch product: ${error.message}`);
  }

  if (!data) {
    return null;
  }

  return data as Product;
}

async function getRelatedProducts(product: Product): Promise<Product[]> {
  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("category", product.category)
    .neq("id", product.id)
    .limit(4);

  if (error || !data) {
    return [];
  }

  return data as Product[];
}

async function getWhatsAppNumber(): Promise<string> {
  const fallback = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "947XXXXXXXX";
  const supabaseAdmin = getSupabaseAdmin();
  const { data } = await supabaseAdmin.from("site_settings").select("phone").single();

  return data?.phone || fallback;
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  try {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
      return {
        title: "Product not found | Mak Wines",
        description: "The requested product could not be found.",
      };
    }

    return {
      title: `${product.name} | Mak Wines`,
      description: product.description || product.name,
      openGraph: {
        title: `${product.name} | Mak Wines`,
        description: product.description || product.name,
        images: product.images?.[0] ? [{ url: product.images[0] }] : [],
      },
    };
  } catch {
    return {
      title: "Mak Wines",
      description: "Product details are temporarily unavailable.",
    };
  }
}

export default async function ProductPage({ params }: PageParams) {
  const { id: productId } = await params;
  const product = await getProduct(productId);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product);
  const whatsappNumber = await getWhatsAppNumber();
  const image = product.images?.[0] || "/Images/categories/Sweets.jpeg";
  const hasOldPrice =
    typeof product.compare_at_price === "number" &&
    product.compare_at_price > product.price;

  return (
    <main className="bg-gray-50 px-4 py-8 sm:py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <section className="overflow-hidden rounded-3xl bg-white shadow-md">
            <div className="relative aspect-square bg-gradient-to-br from-white to-gray-100">
              <Image
                src={image}
                alt={product.name}
                fill
                className="object-contain p-6 transition duration-300 hover:scale-105"
                priority
              />
            </div>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-md sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#660033]">
              {product.category}
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#660033]/10 px-4 py-2 text-lg font-bold text-[#660033]">
                £{product.price.toFixed(2)}
              </span>
              {hasOldPrice && (
                <span className="text-lg font-semibold text-gray-500 line-through decoration-red-500 decoration-2">
                  £{product.compare_at_price?.toFixed(2)}
                </span>
              )}
            </div>

            <div className="mt-5 flex items-center gap-3">
              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  product.stock > 0
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-rose-50 text-rose-700"
                }`}
              >
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
              {product.stock > 0 && (
                <span className="text-sm text-gray-500">{product.stock} available</span>
              )}
            </div>

            {product.description && (
              <p className="mt-6 whitespace-pre-line text-base leading-7 text-gray-600">
                {product.description}
              </p>
            )}

            <div className="mt-6 grid gap-4 rounded-2xl bg-gray-50 p-4 sm:grid-cols-2">
              {product.size && (
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Size
                  </span>
                  <span className="mt-1 block text-base font-medium text-gray-900">
                    {product.size}
                  </span>
                </div>
              )}
              {product.strength && (
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Strength
                  </span>
                  <span className="mt-1 block text-base font-medium text-gray-900">
                    {product.strength}
                  </span>
                </div>
              )}
              {product.flavor && (
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Flavour
                  </span>
                  <span className="mt-1 block text-base font-medium text-gray-900">
                    {product.flavor}
                  </span>
                </div>
              )}
              {product.offer_quantity && product.offer_price ? (
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Offer
                  </span>
                  <span className="mt-1 block text-base font-medium text-gray-900">
                    {product.offer_quantity} for £{product.offer_price}
                  </span>
                </div>
              ) : null}
            </div>

            <div className="mt-6">
              <ProductOrderBox
                productName={product.name}
                price={product.price}
                phoneNumber={whatsappNumber}
              />
            </div>
          </section>
        </div>

        <section className="rounded-3xl bg-white p-6 shadow-md sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#660033]">
                Related Products
              </p>
              <h2 className="mt-2 text-2xl font-bold text-gray-900">
                More from {product.category}
              </h2>
            </div>
            <Link href="/" className="text-sm font-semibold text-[#660033] transition hover:text-[#4f0026]">
              Back to shopping
            </Link>
          </div>

          {relatedProducts.length === 0 ? (
            <p className="mt-6 text-sm text-gray-500">
              No related products are available right now.
            </p>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct) => {
                const relatedImage = relatedProduct.images?.[0] || "/Images/categories/Sweets.jpeg";
                return (
                  <Link
                    key={relatedProduct.id}
                    href={`/products/${relatedProduct.id}`}
                    className="group overflow-hidden rounded-2xl bg-gray-50 shadow-sm transition hover:scale-[1.02] hover:shadow-md"
                  >
                    <div className="relative aspect-square bg-white">
                      <Image
                        src={relatedImage}
                        alt={relatedProduct.name}
                        fill
                        className="object-contain p-4 transition duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#660033]">
                        {relatedProduct.category}
                      </p>
                      <h3 className="mt-2 line-clamp-2 text-sm font-semibold text-gray-900">
                        {relatedProduct.name}
                      </h3>
                      <p className="mt-2 text-sm font-bold text-[#660033]">
                        £{relatedProduct.price.toFixed(2)}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}