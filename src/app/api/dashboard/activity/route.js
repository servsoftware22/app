import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function GET(request) {
  try {
    const supabase = createServerClient();

    // Verify authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Get user data to verify they exist in users table
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("id", user.id)
      .single();

    if (userError) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // TODO: Replace with actual database queries for real activity
    // For now, return mock data
    const activity = [
      {
        id: 1,
        action: "New customer signed up",
        time: "2 minutes ago",
        user: "john@example.com",
      },
      {
        id: 2,
        action: "Appointment scheduled",
        time: "5 minutes ago",
        user: "sarah@example.com",
      },
      {
        id: 3,
        action: "Payment received",
        time: "10 minutes ago",
        user: "mike@example.com",
      },
      {
        id: 4,
        action: "Service completed",
        time: "15 minutes ago",
        user: "lisa@example.com",
      },
    ];

    return NextResponse.json({ activity });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
