import { createServerClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password, businessId } = await request.json();

    // Validate required fields
    if (!email || !password || !businessId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create Supabase client
    const supabase = createServerClient();

    // Attempt to sign in the user
    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (signInError) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // User signed in successfully - check if they have a client record for this business
    const { data: existingClient, error: clientCheckError } = await supabase
      .from("clients")
      .select("*")
      .eq("email", email)
      .eq("business", businessId)
      .single();

    if (clientCheckError && clientCheckError.code !== "PGRST116") {
      console.error("Error checking existing client:", clientCheckError);
      return NextResponse.json(
        { error: "Error checking client records" },
        { status: 500 }
      );
    }

    if (existingClient) {
      // Update client history with login record
      const { error: historyUpdateError } = await supabase
        .from("clients")
        .update({
          history: supabase.sql`COALESCE(history, '[]'::jsonb) || ${JSON.stringify(
            [
              {
                action: "login",
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

      return NextResponse.json({
        success: true,
        message: "Signed in successfully",
        user: signInData.user,
        client: existingClient,
        action: "login",
      });
    } else {
      // User doesn't have a client record for this business - create one
      // We need to get the user's profile info from auth metadata
      const { data: userProfile, error: profileError } =
        await supabase.auth.admin.getUserById(signInData.user.id);

      if (profileError) {
        console.error("Error getting user profile:", profileError);
        return NextResponse.json(
          { error: "Error retrieving user profile" },
          { status: 500 }
        );
      }

      const userMetadata = userProfile.user.user_metadata;
      const fullName =
        userMetadata.full_name || signInData.user.email.split("@")[0];
      const phone = userMetadata.phone || null;

      // Create new client record for this business
      const { data: newClient, error: clientCreateError } = await supabase
        .from("clients")
        .insert({
          business: businessId,
          name: fullName,
          email: email,
          phone: phone,
          address: null,
          notes: null,
          details: {
            signup_method: "existing_user_login",
            original_signup_date: userProfile.user.created_at,
            business_signup_date: new Date().toISOString(),
          },
          preferences: {},
          history: [
            {
              action: "client_created_via_login",
              timestamp: new Date().toISOString(),
              ip:
                request.headers.get("x-forwarded-for") ||
                request.headers.get("x-real-ip") ||
                "unknown",
            },
          ],
        })
        .select()
        .single();

      if (clientCreateError) {
        console.error("Error creating client record:", clientCreateError);
        return NextResponse.json(
          { error: "Error creating client profile" },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Signed in successfully and client profile created",
        user: signInData.user,
        client: newClient,
        action: "login_with_client_creation",
      });
    }
  } catch (error) {
    console.error("Login endpoint error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
