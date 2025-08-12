import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function GET(request) {
  try {
    const supabase = createServerClient(request);

    // Get current user from session
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({
        isAuthenticated: false,
        isOwner: false,
      });
    }

    // Get user data from users table
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("type")
      .eq("id", user.id)
      .single();

    if (userError) {
      return NextResponse.json({
        isAuthenticated: false,
        isOwner: false,
      });
    }

    // Check if user has owner role
    const isOwner = userData?.type?.role === "owner";

    return NextResponse.json({
      isAuthenticated: true,
      isOwner: isOwner,
    });
  } catch (error) {
    return NextResponse.json(
      {
        isAuthenticated: false,
        isOwner: false,
      },
      { status: 500 }
    );
  }
}
