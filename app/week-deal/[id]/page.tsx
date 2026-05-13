import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { WeekDeal } from "@/lib/types/weekDeal";
import ProductOrderBox from "@/Components/Products/ProductOrderBox";

type PageParams = {
  params: Promise<{ id: string }>;
};

async function getWeekDeal(id: string): Promise<WeekDeal | null> {
  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from("week_deals")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(`Failed to fetch week deal: ${error.message}`);
  }

  return data || null;
}

async function getProductIfLinked(link: string | null) {
  if (!link) return null;
  const m = link.match(/products\/(\d+)/);
  if (m && m[1]) {
    const supabaseAdmin = getSupabaseAdmin();
    const { data } = await supabaseAdmin.from("products").select("*").eq("id", m[1]).single();
    return data || null;
  }
  return null;
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  try {
    const { id } = await params;
    const deal = await getWeekDeal(id);

    if (!deal) {
      return {
        title: "Deal not found | Mak Wines",
        description: "The requested week deal could not be found.",
      };
    }

    return {
      title: `${deal.title} | Mak Wines`,
      description: deal.title,
      openGraph: {
        title: `${deal.title} | Mak Wines`,
        description: deal.title,
        images: deal.image ? [{ url: deal.image }] : [],
      },
    };
  } catch {
    return {
      title: "Mak Wines",
      description: "Deal details are temporarily unavailable.",
    };
  }
}

export default async function WeekDealPage({ params }: PageParams) {
  const { id } = await params;
  const deal = await getWeekDeal(id);

  if (!deal) {
    notFound();
  }

  const linkedProduct = await getProductIfLinked(deal.link || null);

  return (
    <main className="bg-gray-50 px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <div className="bg-white rounded-3xl shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative aspect-square bg-gray-100">
              <Image src={deal.image || "/Images/categories/Sweets.jpeg"} alt={deal.title} fill className="object-contain p-6" />
            </div>
            <div className="p-6 sm:p-8">
              <h1 className="text-2xl font-bold text-gray-900">{deal.title}</h1>
              <p className="mt-4 text-gray-700">{deal.description || "Great weekly deal available now."}</p>

              {linkedProduct ? (
                <div className="mt-6">
                  <p className="text-sm text-gray-500">Product</p>
                  <h2 className="text-lg font-semibold">{linkedProduct.name}</h2>
                  <p className="mt-2 text-lg font-bold text-[#660033]">£{linkedProduct.price?.toFixed(2)}</p>
                  <Link href={`/products/${linkedProduct.id}`} className="inline-block mt-4 text-sm text-[#660033] font-semibold">View Product</Link>
                  <div className="mt-4">
                    <ProductOrderBox productName={linkedProduct.name} price={linkedProduct.price} phoneNumber={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""} />
                  </div>
                </div>
              ) : null}

              <div className="mt-6 flex items-center gap-3">
                <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""}?text=${encodeURIComponent(`I'm interested in the week deal: ${deal.title}`)}`} target="_blank" rel="noreferrer" className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold">Order via WhatsApp</a>
                <Link href="/" className="text-sm text-gray-600">Back to shopping</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
