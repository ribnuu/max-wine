import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

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

    const safeSettings = { ...(data as Record<string, unknown>) };
    delete safeSettings.admin_password;
    return NextResponse.json(safeSettings);
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

    const updateData: Record<string, unknown> = {
      email: body.email,
      phone: body.phone,
      address: body.address,
      opening_hours_weekday: body.opening_hours_weekday,
      opening_hours_weekend: body.opening_hours_weekend,
      add_product_enabled: body.add_product_enabled ?? false,
      updated_at: new Date().toISOString(),
    };

    const passwordToHash =
      typeof body.newPassword === "string" && body.newPassword.trim() !== ""
        ? body.newPassword
        : typeof body.admin_password === "string" && body.admin_password.trim() !== ""
        ? body.admin_password
        : "";

    if (passwordToHash) {
      updateData.admin_password = await bcrypt.hash(passwordToHash, 12);
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
