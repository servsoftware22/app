import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { ensureStripeCustomer } from "@/lib/stripe";

export async function POST(request) {
  try {
    const { email, password, phone, fullName } = await request.json();
    const supabase = createServerClient(request);

    // Validate required fields
    if (!email || !password || !phone || !fullName) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate phone number
    const cleanPhone = phone?.replace(/[\s\-\(\)\.]/g, "");
    if (
      !cleanPhone ||
      cleanPhone.length < 10 ||
      cleanPhone.length > 11 ||
      !/^\d+$/.test(cleanPhone)
    ) {
      return NextResponse.json(
        { error: "Please enter a valid US phone number (10-11 digits)" },
        { status: 400 }
      );
    }

    // Create the auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email.toLowerCase(),
      password,
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: "Failed to create user account" },
        { status: 500 }
      );
    }

    // Create user record in users table
    const { error: insertError } = await supabase.from("users").insert([
      {
        id: authData.user.id,
        full_name: fullName,
        email: email.toLowerCase(),
        phone: cleanPhone,
        type: { role: "owner" },
        plan: "free",
        features: {},
        agreed_to_terms: true,
        onboarding: {
          setup: {
            completed: false,
            currentStep: 1,
            lastCompletedStep: 0,
          },
          onboarding: {
            setupScheduling: false,
            setupPayments: false,
            addClients: false,
            addReviews: false,
            reviewServices: false,
            reviewWebsite: false,
          },
        },
        permissions: {},
        integrations: {},
        notifications: {},
        referral_code: null,
        referrer: null,
        settings: {},
        stripe: null,
      },
    ]);

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 400 });
    }

    // Create or retrieve Stripe customer
    let stripeResult = null;
    try {
      stripeResult = await ensureStripeCustomer({
        id: authData.user.id,
        email: email.toLowerCase(),
        fullName,
        phone: cleanPhone,
      });

      if (stripeResult.error) {
        console.error("Failed to ensure Stripe customer:", stripeResult.error);
        // Don't fail the signup if Stripe fails, but log it
        // The user can still use the app, and we can retry Stripe creation later
      }
    } catch (stripeError) {
      console.error("Unexpected error ensuring Stripe customer:", stripeError);
      // Continue with signup even if Stripe fails
    }

    // Update user record with Stripe information if successful
    if (stripeResult && stripeResult.customerId) {
      const { error: stripeUpdateError } = await supabase
        .from("users")
        .update({
          stripe: {
            customerId: stripeResult.customerId,
            customer: stripeResult.customer,
            createdAt: new Date().toISOString(),
            status: "active",
            isNew: stripeResult.isNew,
            lastUpdated: new Date().toISOString(),
          },
        })
        .eq("id", authData.user.id);

      if (stripeUpdateError) {
        console.error(
          "Failed to update user with Stripe info:",
          stripeUpdateError
        );
        // Don't fail the signup if this update fails
      }
    }

    return NextResponse.json({
      message: "User created successfully",
      user: authData.user,
      stripeCustomerId: stripeResult?.customerId || null,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
