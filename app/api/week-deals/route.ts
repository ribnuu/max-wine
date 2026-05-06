import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { weekDealSchema } from "@/lib/validation/schemas";

// GET all week deals
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const includeInactive = searchParams.get("includeInactive") === "true";

  const supabaseAdmin = getSupabaseAdmin();
  let query = supabaseAdmin.from("week_deals").select("*");

  if (!includeInactive) {
    query = query.eq("is_active", true);
  }

  const { data, error } = await query.order("sort_order", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST new week deal
export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = weekDealSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from("week_deals")
    .insert([parsed.data])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
