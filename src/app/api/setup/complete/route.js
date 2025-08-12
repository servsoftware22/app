import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function POST(request) {
  try {
    const {
      businessName,
      businessType,
      businessPhone,
      businessEmail,
      businessAddress,
      businessUnit,
      isPublicBusinessAddress,
      selectedDefaultServiceIds,
      selectedFeatures,
      selectedTemplate,
      primaryColor,
      secondaryColor,
      accentColor,
      neutralColor,
      selectedSubscription,
      billingCycle,
    } = await request.json();

    const supabase = createServerClient(request);

    // Get the current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Validate required fields
    if (
      !businessName ||
      !businessType ||
      !businessPhone ||
      !businessEmail ||
      !businessAddress
    ) {
      return NextResponse.json(
        { error: "Missing required business information" },
        { status: 400 }
      );
    }

    // Check if business table exists and get its structure
    console.log("Checking business table structure...");
    const { data: tableInfo, error: tableError } = await supabase
      .from("business")
      .select("*")
      .limit(0);

    if (tableError) {
      console.error("Table structure error:", tableError);
      return NextResponse.json(
        { error: `Business table error: ${tableError.message}` },
        { status: 500 }
      );
    }

    // Create business record
    console.log("Attempting to create business with data:", {
      name: businessName,
      owner: user.id,
      businessType,
      businessPhone,
      businessEmail,
      businessAddress,
      businessUnit,
      isPublicBusinessAddress,
      selectedDefaultServiceIds,
      selectedFeatures,
      selectedTemplate,
      primaryColor,
      secondaryColor,
      accentColor,
      neutralColor,
      selectedSubscription,
      billingCycle,
    });

    // Parse address components from the full address string
    const parseAddress = (fullAddress) => {
      // Common patterns for US addresses
      const patterns = [
        // Pattern: "Street Address, City, State, Country" or "Street Address, City, State ZIP, Country"
        /^(.+?),\s*([^,]+?),\s*([A-Z]{2})\s*(\d{5}(?:-\d{4})?)?\s*,\s*(.+)$/i,
        // Pattern: "Street Address, City, State, Country"
        /^(.+?),\s*([^,]+?),\s*([A-Z]{2})\s*,\s*(.+)$/i,
        // Pattern: "Street Address, City, State ZIP"
        /^(.+?),\s*([^,]+?),\s*([A-Z]{2})\s*(\d{5}(?:-\d{4})?)$/i,
        // Pattern: "Street Address, City, State"
        /^(.+?),\s*([^,]+?),\s*([A-Z]{2})$/i,
      ];

      for (const pattern of patterns) {
        const match = fullAddress.match(pattern);
        if (match) {
          return {
            street: match[1].trim(),
            city: match[2].trim(),
            state: match[3].trim(),
            zip: match[4] || "",
            country: match[5] || "USA",
            unit: businessUnit || "",
            isPublic: isPublicBusinessAddress,
          };
        }
      }

      // Fallback if no pattern matches
      return {
        street: fullAddress,
        city: "",
        state: "",
        zip: "",
        country: "USA",
        unit: businessUnit || "",
        isPublic: isPublicBusinessAddress,
      };
    };

    const parsedAddress = parseAddress(businessAddress);

    const { data: business, error: businessError } = await supabase
      .from("business")
      .insert({
        name: businessName,
        owner: user.id,
        business_info: {
          name: businessName,
          type: businessType,
          phone: businessPhone,
          email: businessEmail,
          address: parsedAddress,
        },
        status: "active",
        services: selectedDefaultServiceIds || [],
        team: {
          members: [
            {
              id: user.id,
              role: "owner",
              permissions: ["all"],
            },
          ],
        },
        settings: {
          template: selectedTemplate,
          colors: {
            primary: primaryColor,
            secondary: secondaryColor,
            accent: accentColor,
            neutral: neutralColor,
          },
          features: selectedFeatures || [],
        },
        integrations: {},
        custom: {},
        admins: [user.id],
        phone: businessPhone,
        address: parsedAddress,
        email: businessEmail,
        type: businessType,
      })
      .select()
      .single();

    if (businessError) {
      console.error("Business creation error:", businessError);
      console.error("Business creation error details:", {
        code: businessError.code,
        message: businessError.message,
        details: businessError.details,
        hint: businessError.hint,
      });
      return NextResponse.json(
        { error: `Failed to create business: ${businessError.message}` },
        { status: 500 }
      );
    }

    // Get user's current Stripe data to extract subscription information
    const { data: userData, error: userDataError } = await supabase
      .from("users")
      .select("stripe")
      .eq("id", user.id)
      .single();

    if (userDataError) {
      console.error("Error fetching user data:", userDataError);
      return NextResponse.json(
        { error: "Failed to fetch user data" },
        { status: 500 }
      );
    }

    // Extract subscription information from Stripe data
    const stripeData = userData.stripe || {};
    const subscriptionData = stripeData.subscription || {};

    console.log("Extracted subscription data:", {
      stripeData,
      subscriptionData,
      selectedSubscription,
      billingCycle,
    });

    // Get current onboarding structure to preserve existing data
    const currentOnboarding = userData.onboarding || {
      setupScheduling: false,
      setupPayments: false,
      addClients: false,
      addReviews: false,
      reviewServices: false,
      reviewWebsite: false,
    };

    // Update user's onboarding status and subscription information
    const { error: onboardingError } = await supabase
      .from("users")
      .update({
        onboarding: {
          ...currentOnboarding, // Preserve existing onboarding structure
          setup: {
            completed: true,
            lastCompletedStep: 12, // Payment step
            currentStep: 12,
            businessType: true,
            businessName: true,
            businessPhone: true,
            businessEmail: true,
            businessAddress: true,
            businessUnit: true,
            services: true,
            features: true,
            template: true,
            brandColors: true,
            subscription: true,
            payment: true,
          },
          status: {
            lastCompletedStep: 12,
            currentStep: 12,
            completed: true,
          },
        },
        plan: "trial",
        subscription: {
          id: subscriptionData.id || null,
          status: subscriptionData.status || "trialing",
          currentPeriodEnd: subscriptionData.currentPeriodEnd || null,
          trialEnd: subscriptionData.trialEnd || null,
          priceId: subscriptionData.priceId || null,
          billingCycle: subscriptionData.billingCycle || null,
          plan: selectedSubscription || null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      })
      .eq("id", user.id);

    // Log what subscription data is being stored
    const subscriptionToStore = {
      id: subscriptionData.id || null,
      status: subscriptionData.status || "trialing",
      currentPeriodEnd: subscriptionData.currentPeriodEnd || null,
      trialEnd: subscriptionData.trialEnd || null,
      priceId: subscriptionData.priceId || null,
      billingCycle: subscriptionData.billingCycle || null,
      plan: selectedSubscription || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    console.log(
      "Storing subscription data in users table:",
      subscriptionToStore
    );

    // Log the final onboarding structure
    const finalOnboardingStructure = {
      ...currentOnboarding,
      setup: {
        completed: true,
        lastCompletedStep: 12,
        currentStep: 12,
        businessType: true,
        businessName: true,
        businessPhone: true,
        businessEmail: true,
        businessAddress: true,
        businessUnit: true,
        services: true,
        features: true,
        template: true,
        brandColors: true,
        subscription: true,
        payment: true,
      },
      status: {
        lastCompletedStep: 12,
        currentStep: 12,
        completed: true,
      },
    };

    console.log("Final onboarding structure:", finalOnboardingStructure);

    if (onboardingError) {
      console.error("Onboarding update error:", onboardingError);
      return NextResponse.json(
        { error: "Failed to update onboarding status" },
        { status: 500 }
      );
    }

    // Note: Business association is handled through the owner field in the business table
    // No need to update users table with business_id since it doesn't exist
    console.log(
      "Business created successfully. User association handled via owner field."
    );

    console.log("Setup completed successfully for user:", user.id);
    console.log("Business created:", business.id);

    return NextResponse.json({
      success: true,
      business: business,
      message: "Setup completed successfully",
    });
  } catch (error) {
    console.error("Setup completion error:", error);
    return NextResponse.json(
      { error: "Failed to complete setup" },
      { status: 500 }
    );
  }
}
