import { NextResponse } from "next/server";
import { createServerClient, canRunAPI } from "@/lib/supabase";

export async function POST(request) {
  // Check if we can run this API route during build
  if (!canRunAPI()) {
    return NextResponse.json(
      { error: "API not available during build" },
      { status: 503 }
    );
  }

  try {
    const { email, password, fullName, phone } = await request.json();
    const supabase = createServerClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Check if user has a users table row
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", data.user.id)
      .single();

    if (userError && userError.code === "PGRST116") {
      // No users table row found - create one
      console.log(
        "User authenticated but no users table row found, creating one:",
        data.user.id
      );

      // First, check if there's a clients table row with this email
      const { data: clientData, error: clientError } = await supabase
        .from("clients")
        .select("name, phone")
        .eq("email", data.user.email)
        .single();

      let userName, userPhone;

      if (clientError && clientError.code !== "PGRST116") {
        console.error("Error checking clients table:", clientError);
        // Fallback to provided data or auth user data
        userName = fullName || data.user.user_metadata?.full_name || "User";
        userPhone = phone || "";
      } else if (clientData) {
        // Found client data, use it
        console.log("Found existing client data for email:", data.user.email);
        userName =
          clientData.name ||
          fullName ||
          data.user.user_metadata?.full_name ||
          "User";
        userPhone = clientData.phone || phone || "";
      } else {
        // No client data found, use provided data or auth user data
        userName = fullName || data.user.user_metadata?.full_name || "User";
        userPhone = phone || "";
      }

      // Clean phone number
      const cleanPhone = userPhone?.replace(/[\s\-\(\)\.]/g, "") || "";

      // Validate phone if we have one
      if (
        userPhone &&
        (!cleanPhone ||
          cleanPhone.length < 10 ||
          cleanPhone.length > 11 ||
          !/^\d+$/.test(cleanPhone))
      ) {
        return NextResponse.json(
          { error: "Please provide a valid US phone number (10-11 digits)" },
          { status: 400 }
        );
      }

      // Create users table row
      const { error: insertError } = await supabase.from("users").insert([
        {
          id: data.user.id,
          full_name: userName,
          email: data.user.email,
          phone: cleanPhone || null,
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
        console.error("Error creating users table row:", insertError);
        return NextResponse.json(
          { error: "Failed to create user profile" },
          { status: 500 }
        );
      }

      console.log("Users table row created successfully for:", data.user.id);

      return NextResponse.json({
        user: data.user,
        userCreated: true,
        message: "User profile created successfully",
      });
    }

    // User already has users table row
    return NextResponse.json({
      user: data.user,
      userCreated: false,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
