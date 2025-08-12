import { NextResponse } from "next/server";
import { createServerClient, canRunAPI } from "@/lib/supabase";

export async function POST(request) {
  // Check if we can run this API route during build
  if (!canRunAPI()) {
    return NextResponse.json(
      { error: "API not available during build" },
      { status: 503 }
    );
  }

  try {
    const { email, password } = await request.json();
    const supabase = createServerClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ user: data.user });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
