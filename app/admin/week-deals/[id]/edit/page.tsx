"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import WeekDealForm from "@/Components/Admin/WeekDealForm";
import { WeekDeal } from "@/lib/types/weekDeal";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function EditWeekDealPage() {
  const params = useParams();
  const [deal, setDeal] = useState<WeekDeal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/week-deals/${params.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch deal");
        return res.json();
      })
      .then((data) => {
        setDeal(data);
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

  if (error || !deal) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error || "Deal not found"}</p>
        <Link href="/admin/week-deals" className="text-[#660033] hover:underline">
          Back to Week Deals
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <Link
          href="/admin/week-deals"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#660033] transition-colors text-sm sm:text-base"
        >
          <ArrowLeft size={18} />
          Back to Week Deals
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-4">Edit Deal</h1>
      </div>

      <WeekDealForm deal={deal} isEditing />
    </div>
  );
}
