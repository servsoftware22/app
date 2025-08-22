import { createServerClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password, fullName, phone, businessId } =
      await request.json();

    // Validate required fields
    if (!email || !password || !fullName || !phone || !businessId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create Supabase client
    const supabase = createServerClient();

    // First, check if user already exists in auth
    const { data: existingUser, error: authCheckError } =
      await supabase.auth.admin.getUserByEmail(email);

    if (authCheckError && authCheckError.code !== "user_not_found") {
      console.error("Error checking existing user:", authCheckError);
      return NextResponse.json(
        { error: "Error checking user authentication" },
        { status: 500 }
      );
    }

    if (existingUser?.user) {
      // User already exists - attempt to sign them in
      const { data: signInData, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) {
        // Password is incorrect
        return NextResponse.json(
          {
            error:
              "Incorrect password. You already have an account. Please sign in instead.",
            redirectTo: "/login",
          },
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
          action: "signin",
        });
      } else {
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
              signup_method: "existing_user",
              original_signup_date: existingUser.user.created_at,
              business_signup_date: new Date().toISOString(),
            },
            preferences: {},
            history: [
              {
                action: "client_created",
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
          action: "signin_with_client_creation",
        });
      }
    } else {
      // User doesn't exist - create new user and client record
      const { data: signUpData, error: signUpError } =
        await supabase.auth.admin.createUser({
          email,
          password,
          email_confirm: true, // Auto-confirm email for user-generated sites
          user_metadata: {
            full_name: fullName,
            phone: phone,
            signup_source: "user_generated_site",
            business_id: businessId,
          },
        });

      if (signUpError) {
        console.error("Error creating user:", signUpError);
        return NextResponse.json(
          { error: "Error creating user account" },
          { status: 500 }
        );
      }

      // Create client record
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
            signup_method: "new_user",
            signup_date: new Date().toISOString(),
            auth_user_id: signUpData.user.id,
          },
          preferences: {},
          history: [
            {
              action: "signup",
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
        // Try to clean up the created user if client creation fails
        await supabase.auth.admin.deleteUser(signUpData.user.id);

        return NextResponse.json(
          { error: "Error creating client profile" },
          { status: 500 }
        );
      }

      // Sign in the newly created user
      const { data: signInData, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) {
        console.error("Error signing in new user:", signInError);
        return NextResponse.json(
          {
            error: "Account created but sign in failed. Please try signing in.",
          },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Account created and signed in successfully",
        user: signInData.user,
        client: newClient,
        action: "signup",
      });
    }
  } catch (error) {
    console.error("Signup endpoint error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
