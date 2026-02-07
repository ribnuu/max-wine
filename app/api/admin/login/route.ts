import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  // Check password from database first
  let validPassword = process.env.ADMIN_PASSWORD;

  try {
    const { data } = await supabase
      .from("site_settings")
      .select("admin_password")
      .single();

    if (data?.admin_password) {
      validPassword = data.admin_password;
    }
  } catch {
    // Fall back to env variable if database check fails
  }

  if (password === validPassword) {
    const response = NextResponse.json({ success: true });

    // Set HTTP-only cookie valid for 24 hours
    response.cookies.set("admin_auth", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return response;
  }

  return NextResponse.json({ error: "Invalid password" }, { status: 401 });
}
