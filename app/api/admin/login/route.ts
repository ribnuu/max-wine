import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);
const ADMIN_EMAIL = "mak@makwines.co.uk";
const BCRYPT_HASH_REGEX = /^\$2[aby]\$\d{2}\$.{53}$/;

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  const envPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Unauthorized email" }, { status: 401 });
  }

  if (!password || typeof password !== "string") {
    return NextResponse.json({ error: "Password is required" }, { status: 400 });
  }

  if (!envPasswordHash) {
    return NextResponse.json(
      { error: "Admin password is not configured" },
      { status: 500 }
    );
  }

  let validPasswordHash = envPasswordHash;

  try {
    const { data } = await supabase
      .from("site_settings")
      .select("admin_password")
      .single();

    if (data?.admin_password) {
      validPasswordHash = data.admin_password;
    }
  } catch {
    validPasswordHash = envPasswordHash;
  }

  if (!BCRYPT_HASH_REGEX.test(validPasswordHash)) {
    return NextResponse.json(
      { error: "Admin password hash is invalid. Regenerate ADMIN_PASSWORD_HASH." },
      { status: 500 }
    );
  }

  let isValid = false;
  try {
    isValid = await bcrypt.compare(password, validPasswordHash);
  } catch {
    return NextResponse.json(
      { error: "Password verification failed due to invalid hash format." },
      { status: 500 }
    );
  }

  if (isValid) {
    const response = NextResponse.json({ success: true });

    response.cookies.set("admin-auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 86400,
      path: "/",
    });

    return response;
  }

  return NextResponse.json({ error: "Invalid password" }, { status: 401 });
}
