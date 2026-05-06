import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { heroSlideSchema } from "@/lib/validation/schemas";

// GET all hero slides
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const includeInactive = searchParams.get("includeInactive") === "true";

  const supabaseAdmin = getSupabaseAdmin();
  let query = supabaseAdmin.from("hero_slides").select("*");

  if (!includeInactive) {
    query = query.eq("is_active", true);
  }

  const { data, error } = await query.order("sort_order", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST new hero slide
export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = heroSlideSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from("hero_slides")
    .insert([parsed.data])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
