import { NextResponse } from "next/server";
import Stripe from "stripe";

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
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "API not available during build" },
      { status: 503 }
    );
  }

  try {
    const stripe = createStripeClient();

    // If we can't create a Stripe client (e.g., during build), return an error
    if (!stripe) {
      return NextResponse.json(
        { error: "Payment service not available" },
        { status: 503 }
      );
    }

    const { priceId } = await request.json();

    if (!priceId) {
      return NextResponse.json(
        { error: "Price ID is required" },
        { status: 400 }
      );
    }

    // Get the price from Stripe
    const price = await stripe.prices.retrieve(priceId);

    console.log("Stripe price retrieved:", {
      id: price.id,
      unitAmount: price.unit_amount,
      currency: price.currency,
      recurring: price.recurring,
    });

    return NextResponse.json({ price });
  } catch (error) {
    console.error("Get pricing error:", error);
    return NextResponse.json(
      { error: "Failed to get pricing" },
      { status: 500 }
    );
  }
}
