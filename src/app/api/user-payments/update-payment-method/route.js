import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createServerClient, canRunAPI } from "@/lib/supabase";

// Only create Stripe client if environment variables are available
const createStripeClient = () => {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    return null;
  }

  return new Stripe(stripeSecretKey, {
    apiVersion: "2024-12-18.acacia",
  });
};

export async function POST(request) {
  // Check if we can run this API route during build
  if (!canRunAPI() || !process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "API not available during build" },
      { status: 503 }
    );
  }

  try {
    const stripe = createStripeClient();
    const supabase = createServerClient(request);

    // If we can't create clients (e.g., during build), return an error
    if (!stripe || !supabase) {
      return NextResponse.json(
        { error: "Services not available" },
        { status: 503 }
      );
    }

    const { paymentMethodId } = await request.json();

    // Get the current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!paymentMethodId) {
      return NextResponse.json(
        { error: "Payment method ID is required" },
        { status: 400 }
      );
    }

    // Get user's current Stripe data
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("stripe")
      .eq("id", user.id)
      .single();

    if (userError) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const customerId = userData.stripe?.customerId;
    if (!customerId) {
      return NextResponse.json(
        { error: "No Stripe customer found" },
        { status: 404 }
      );
    }

    // Attach the payment method to the customer
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });

    // Set as default payment method
    await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // Update user's payment method data
    await supabase
      .from("users")
      .update({
        stripe: {
          ...userData.stripe,
          defaultPaymentMethod: paymentMethodId,
          lastUpdated: new Date().toISOString(),
        },
      })
      .eq("id", user.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update payment method error:", error);
    return NextResponse.json(
      { error: "Failed to update payment method" },
      { status: 500 }
    );
  }
}
