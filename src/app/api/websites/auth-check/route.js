import { createServerClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { businessId } = await request.json();

    // Validate required fields
    if (!businessId) {
      return NextResponse.json(
        { error: "Missing business ID" },
        { status: 400 }
      );
    }

    // Create Supabase client with request context
    const supabase = createServerClient(request);

    // Check if user is authenticated
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      // User is not authenticated
      return NextResponse.json({
        isAuthenticated: false,
        hasClientRecord: false,
        user: null,
        client: null,
        message: "User not authenticated",
      });
    }

    // User is authenticated, check if they have a client record for this business
    const { data: client, error: clientError } = await supabase
      .from("clients")
      .select("*")
      .eq("email", user.email)
      .eq("business", businessId)
      .single();

    if (clientError && clientError.code !== "PGRST116") {
      console.error("Error checking client record:", clientError);
      return NextResponse.json(
        { error: "Error checking client records" },
        { status: 500 }
      );
    }

    const hasClientRecord = !!client;

    return NextResponse.json({
      isAuthenticated: true,
      hasClientRecord,
      user: {
        id: user.id,
        email: user.email,
        user_metadata: user.user_metadata,
      },
      client,
      message: hasClientRecord
        ? "User authenticated and has client record for this business"
        : "User authenticated but no client record for this business",
    });
  } catch (error) {
    console.error("Auth check endpoint error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
