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

    const { priceId, billingCycle, paymentMethodId } = await request.json();

    // Get the current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!priceId) {
      return NextResponse.json(
        { error: "Price ID is required" },
        { status: 400 }
      );
    }

    // Get user's current Stripe data
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("stripe, email, full_name")
      .eq("id", user.id)
      .single();

    if (userError) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let customerId = userData.stripe?.customerId;

    // Create Stripe customer if doesn't exist
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: userData.email,
        name: userData.full_name,
        metadata: {
          userId: user.id,
          userType: "owner",
        },
      });
      customerId = customer.id;

      // Update user's Stripe data
      await supabase
        .from("users")
        .update({
          stripe: {
            isNew: false,
            status: "active",
            customer: customer,
            createdAt: new Date().toISOString(),
            customerId: customerId,
            lastUpdated: new Date().toISOString(),
          },
        })
        .eq("id", user.id);
    }

    // Set the payment method as default for the customer BEFORE creating subscription
    if (paymentMethodId) {
      try {
        console.log("Setting payment method as default:", paymentMethodId);

        // Attach the payment method to the customer if not already attached
        await stripe.paymentMethods.attach(paymentMethodId, {
          customer: customerId,
        });
        console.log("Payment method attached to customer");

        // Set as default payment method
        const updatedCustomer = await stripe.customers.update(customerId, {
          invoice_settings: {
            default_payment_method: paymentMethodId,
          },
        });

        console.log("Customer updated with default payment method:", {
          customerId,
          invoiceSettings: updatedCustomer.invoice_settings,
        });
      } catch (paymentError) {
        console.error("Error setting default payment method:", paymentError);
        // Don't fail the subscription creation, but log the error
      }
    } else {
      console.log("No paymentMethodId provided");
    }

    // Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"],
      trial_period_days: 7,
      trial_settings: {
        end_behavior: {
          missing_payment_method: "cancel",
        },
      },
      metadata: {
        userId: user.id,
        billingCycle,
      },
    });

    // Double-check that the default payment method is set on the subscription
    if (paymentMethodId) {
      try {
        const updatedSubscription = await stripe.subscriptions.update(
          subscription.id,
          {
            default_payment_method: paymentMethodId,
          }
        );
        console.log("Default payment method set on subscription:", {
          subscriptionId: subscription.id,
          defaultPaymentMethod: updatedSubscription.default_payment_method,
        });
      } catch (updateError) {
        console.error(
          "Error setting default payment method on subscription:",
          updateError
        );
      }
    }

    console.log("Subscription created:", {
      id: subscription.id,
      status: subscription.status,
      trialEnd: subscription.trial_end,
      currentPeriodEnd: subscription.current_period_end,
      trialStart: subscription.trial_start,
      defaultPaymentMethod: subscription.default_payment_method,
    });

    // Final verification - check customer and subscription state
    try {
      const finalCustomer = await stripe.customers.retrieve(customerId);
      const finalSubscription = await stripe.subscriptions.retrieve(
        subscription.id
      );

      console.log("Final verification:", {
        customer: {
          id: finalCustomer.id,
          invoiceSettings: finalCustomer.invoice_settings,
        },
        subscription: {
          id: finalSubscription.id,
          defaultPaymentMethod: finalSubscription.default_payment_method,
        },
      });
    } catch (verifyError) {
      console.error("Error during final verification:", verifyError);
    }

    // For trial subscriptions, we don't need a client secret
    console.log("Trial subscription created successfully");

    // Update user's subscription data
    await supabase
      .from("users")
      .update({
        stripe: {
          ...userData.stripe,
          subscription: {
            id: subscription.id,
            status: subscription.status,
            currentPeriodEnd: new Date(
              subscription.current_period_end * 1000
            ).toISOString(),
            trialEnd: new Date(subscription.trial_end * 1000).toISOString(),
            priceId,
            billingCycle,
          },
          lastUpdated: new Date().toISOString(),
        },
      })
      .eq("id", user.id);

    return NextResponse.json({
      success: true,
      subscriptionId: subscription.id,
    });
  } catch (error) {
    console.error("Create subscription error:", error);
    return NextResponse.json(
      { error: "Failed to create subscription" },
      { status: 500 }
    );
  }
}
