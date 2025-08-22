import { createServerClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, businessId } = await request.json();

    // Validate required fields
    if (!email || !businessId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create Supabase client
    const supabase = createServerClient();

    // Check if user exists in auth
    const { data: existingUser, error: authCheckError } =
      await supabase.auth.admin.getUserByEmail(email);

    if (authCheckError && authCheckError.code !== "user_not_found") {
      console.error("Error checking existing user:", authCheckError);
      return NextResponse.json(
        { error: "Error checking user authentication" },
        { status: 500 }
      );
    }

    if (!existingUser?.user) {
      // User doesn't exist - don't reveal this information for security
      return NextResponse.json({
        success: true,
        message:
          "If an account with that email exists, a password reset link has been sent.",
      });
    }

    // User exists - send password reset email
    const { error: resetError } = await supabase.auth.admin.generateLink({
      type: "recovery",
      email: email,
      options: {
        redirectTo: `${
          process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
        }/reset-password`,
      },
    });

    if (resetError) {
      console.error("Error sending password reset:", resetError);
      return NextResponse.json(
        { error: "Error sending password reset email" },
        { status: 500 }
      );
    }

    // Log the password reset request in client history if they have a client record
    const { data: existingClient, error: clientCheckError } = await supabase
      .from("clients")
      .select("*")
      .eq("email", email)
      .eq("business", businessId)
      .single();

    if (existingClient && !clientCheckError) {
      // Update client history with password reset request
      const { error: historyUpdateError } = await supabase
        .from("clients")
        .update({
          history: supabase.sql`COALESCE(history, '[]'::jsonb) || ${JSON.stringify(
            [
              {
                action: "password_reset_requested",
                timestamp: new Date().toISOString(),
                ip:
                  request.headers.get("x-forwarded-for") ||
                  request.headers.get("x-real-ip") ||
                  "unknown",
              },
            ]
          )}::jsonb`,
        })
        .eq("id", existingClient.id);

      if (historyUpdateError) {
        console.error("Error updating client history:", historyUpdateError);
        // Don't fail the request for history update errors
      }
    }

    return NextResponse.json({
      success: true,
      message:
        "If an account with that email exists, a password reset link has been sent.",
    });
  } catch (error) {
    console.error("Forgot password endpoint error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
