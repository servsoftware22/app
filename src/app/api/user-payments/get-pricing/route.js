import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with secret key for this API route
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-12-18.acacia",
});

export async function POST(request) {
  try {
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
      recurring: price.recurring
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
