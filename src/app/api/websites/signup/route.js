import { createServerClient } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { ensureStripeCustomer } from "@/lib/stripe";

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

    // Create Supabase client with request context
    const supabase = createServerClient(request);

    // Try to sign up the user (this will fail if user already exists)
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email.toLowerCase(),
      password,
    });

    if (authError) {
      // If user already exists, try to sign them in
      if (
        authError.message.includes("already registered") ||
        authError.code === "user_already_exists"
      ) {
        const { data: signInData, error: signInError } =
          await supabase.auth.signInWithPassword({
            email: email.toLowerCase(),
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
          .eq("email", email.toLowerCase())
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
          const currentHistory = existingClient.history || [];
          const newHistoryEntry = {
            action: "login",
            timestamp: new Date().toISOString(),
            ip:
              request.headers.get("x-forwarded-for") ||
              request.headers.get("x-real-ip") ||
              "unknown",
          };

          // Check if client already has Stripe info, if not, create/retrieve it
          let stripeResult = null;
          if (!existingClient.stripe || !existingClient.stripe.customerId) {
            try {
              stripeResult = await ensureStripeCustomer({
                id: signInData.user.id,
                email: email.toLowerCase(),
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
          }

          // Update client with history and Stripe info if available
          const updateData = {
            history: [...currentHistory, newHistoryEntry],
          };

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
            action: "signin",
            session: signInData.session,
          });
        } else {
          // Create or retrieve Stripe customer for existing user
          let stripeResult = null;
          try {
            stripeResult = await ensureStripeCustomer({
              id: signInData.user.id,
              email: email.toLowerCase(),
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
            email: email.toLowerCase(),
            phone: phone,
            address: null,
            notes: null,
            details: {
              signup_method: "existing_user",
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

          // Create response with session data
          const response = NextResponse.json({
            success: true,
            message: "Signed in successfully and client profile created",
            user: signInData.user,
            client: newClient,
            action: "signin_with_client_creation",
            session: signInData.session,
          });

          // Let Supabase handle the session cookies by setting the session
          await supabase.auth.setSession(signInData.session);

          return response;
        }
      } else {
        // Some other auth error
        return NextResponse.json({ error: authError.message }, { status: 400 });
      }
    } else {
      // New user created successfully
      if (!authData.user) {
        return NextResponse.json(
          { error: "Failed to create user account" },
          { status: 500 }
        );
      }

      // Create or retrieve Stripe customer for new user
      let stripeResult = null;
      try {
        stripeResult = await ensureStripeCustomer({
          id: authData.user.id,
          email: email.toLowerCase(),
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
        email: email.toLowerCase(),
        phone: phone,
        address: null,
        notes: null,
        details: {
          signup_method: "new_user",
          signup_date: new Date().toISOString(),
          auth_user_id: authData.user.id,
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

      // Create client record
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

      // Create response with success data (don't sign in server-side)
      return NextResponse.json({
        success: true,
        message: "Account created successfully. Please sign in.",
        user: authData.user,
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
