import { createServerClient } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { ensureStripeCustomer } from "@/lib/stripe";

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
      // Check if client already has Stripe info, if not, create/retrieve it
      let stripeResult = null;
      if (!existingClient.stripe || !existingClient.stripe.customerId) {
        try {
          stripeResult = await ensureStripeCustomer({
            id: signInData.user.id,
            email: email,
            fullName: existingClient.name,
            phone: existingClient.phone,
          });

          if (stripeResult.error) {
            console.error(
              "Failed to ensure Stripe customer:",
              stripeResult.error
            );
            // Don't fail the request if Stripe fails
          }
        } catch (stripeError) {
          console.error(
            "Unexpected error ensuring Stripe customer:",
            stripeError
          );
          // Continue even if Stripe fails
        }
      }

      // Prepare update data with history
      const updateData = {
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
      };

      // Add Stripe info if available
      if (stripeResult && stripeResult.customerId) {
        updateData.stripe = {
          customerId: stripeResult.customerId,
          customer: stripeResult.customer,
          createdAt: new Date().toISOString(),
          status: "active",
          isNew: stripeResult.isNew,
          lastUpdated: new Date().toISOString(),
        };
      }

      // Update client with history and Stripe info if available
      const { error: updateError } = await supabase
        .from("clients")
        .update(updateData)
        .eq("id", existingClient.id);

      if (updateError) {
        console.error("Error updating client:", updateError);
        // Don't fail the request for update errors
      }

      // If Stripe info was added, refresh the client data
      let updatedClient = existingClient;
      if (stripeResult && stripeResult.customerId) {
        const { data: refreshedClient } = await supabase
          .from("clients")
          .select("*")
          .eq("id", existingClient.id)
          .single();
        if (refreshedClient) {
          updatedClient = refreshedClient;
        }
      }

      return NextResponse.json({
        success: true,
        message: "Signed in successfully",
        user: signInData.user,
        client: updatedClient,
        action: "login",
      });
    } else {
      // User doesn't have a client record for this business - create one
      // Use the user data we already have from signInData
      const userMetadata = signInData.user.user_metadata || {};
      const fullName =
        userMetadata.full_name || signInData.user.email.split("@")[0];
      const phone = userMetadata.phone || null;

      // Create or retrieve Stripe customer for existing user logging in
      let stripeResult = null;
      try {
        stripeResult = await ensureStripeCustomer({
          id: signInData.user.id,
          email: email,
          fullName,
          phone: phone,
        });

        if (stripeResult.error) {
          console.error(
            "Failed to ensure Stripe customer:",
            stripeResult.error
          );
          // Don't fail the request if Stripe fails
        }
      } catch (stripeError) {
        console.error(
          "Unexpected error ensuring Stripe customer:",
          stripeError
        );
        // Continue even if Stripe fails
      }

      // Prepare client data with Stripe info if available
      const clientData = {
        business: businessId,
        name: fullName,
        email: email,
        phone: phone,
        address: null,
        notes: null,
        details: {
          signup_method: "existing_user_login",
          original_signup_date: signInData.user.created_at,
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
      };

      // Add Stripe info if available
      if (stripeResult && stripeResult.customerId) {
        clientData.stripe = {
          customerId: stripeResult.customerId,
          customer: stripeResult.customer,
          createdAt: new Date().toISOString(),
          status: "active",
          isNew: stripeResult.isNew,
          lastUpdated: new Date().toISOString(),
        };
      }

      // Create new client record for this business
      const { data: newClient, error: clientCreateError } = await supabase
        .from("clients")
        .insert(clientData)
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
