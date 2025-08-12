import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function GET(request) {
  try {
    const supabase = createServerClient(request);

    // Get the current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Fetch business types from the business_types table
    const { data: businessTypes, error } = await supabase
      .from("business_types")
      .select("id, name, description")
      .order("name");

    if (error) {
      console.error("Error fetching business types:", error);
      return NextResponse.json(
        { error: "Failed to fetch business types" },
        { status: 500 }
      );
    }

    return NextResponse.json(businessTypes);
  } catch (error) {
    console.error("Error in business-types API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
