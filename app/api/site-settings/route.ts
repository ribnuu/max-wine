import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .single();

    if (error && error.code !== "PGRST116") {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Return default settings if none exist
    if (!data) {
      return NextResponse.json({
        email: "mak@makwines.co.uk",
        phone: "",
        address: "6 Peachcroft Shopping Centre, Peachcroft road, Abingdon, Oxfordshire, OX14 2QA.",
        opening_hours_weekday: "Sun - Thu: 12pm - 9pm",
        opening_hours_weekend: "Fri - Sat: 12pm - 10pm",
        add_product_enabled: false,
      });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Check if settings already exist
    const { data: existing } = await supabase
      .from("site_settings")
      .select("id")
      .single();

    // Build update object - only include admin_password if provided
    const updateData: Record<string, unknown> = {
      email: body.email,
      phone: body.phone,
      address: body.address,
      opening_hours_weekday: body.opening_hours_weekday,
      opening_hours_weekend: body.opening_hours_weekend,
      add_product_enabled: body.add_product_enabled ?? false,
      updated_at: new Date().toISOString(),
    };

    // Only update password if a new one is provided
    if (body.admin_password && body.admin_password.trim() !== "") {
      updateData.admin_password = body.admin_password;
    }

    let result;
    if (existing) {
      // Update existing
      result = await supabase
        .from("site_settings")
        .update(updateData)
        .eq("id", existing.id)
        .select()
        .single();
    } else {
      // Insert new
      result = await supabase
        .from("site_settings")
        .insert(updateData)
        .select()
        .single();
    }

    if (result.error) {
      return NextResponse.json({ error: result.error.message }, { status: 500 });
    }

    return NextResponse.json(result.data);
  } catch {
    return NextResponse.json(
      { error: "Failed to save settings" },
      { status: 500 }
    );
  }
}
