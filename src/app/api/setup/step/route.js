import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

// Get current user's setup progress (users.onboarding.setup)
export async function GET(request) {
  try {
    const supabase = createServerClient(request);

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { data: userRow, error: userError } = await supabase
      .from("users")
      .select("onboarding")
      .eq("id", user.id)
      .single();

    if (userError || !userRow) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const onboarding = userRow.onboarding || {};
    const setup = onboarding.setup || {};
    return NextResponse.json({ setup, onboarding });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Update current user's setup progress
// Body: { currentStep?: number, lastCompletedStep?: number, completed?: boolean }
export async function PATCH(request) {
  try {
    const supabase = createServerClient(request);

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const { currentStep, lastCompletedStep, completed } = body || {};

    if (
      typeof currentStep === "undefined" &&
      typeof lastCompletedStep === "undefined" &&
      typeof completed === "undefined"
    ) {
      return NextResponse.json(
        { error: "No fields provided" },
        { status: 400 }
      );
    }

    // Load existing onboarding json
    const { data: userRow, error: userError } = await supabase
      .from("users")
      .select("onboarding")
      .eq("id", user.id)
      .single();

    if (userError || !userRow) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const prevOnboarding = userRow.onboarding || {};
    const prevSetup = prevOnboarding.setup || {
      completed: false,
      currentStep: 1,
      lastCompletedStep: 0,
    };

    const nextSetup = {
      ...prevSetup,
      ...(typeof currentStep !== "undefined" ? { currentStep } : {}),
      ...(typeof lastCompletedStep !== "undefined"
        ? { lastCompletedStep }
        : {}),
      ...(typeof completed !== "undefined" ? { completed } : {}),
    };

    const nextOnboarding = {
      ...prevOnboarding,
      setup: nextSetup,
    };

    const { error: updateError } = await supabase
      .from("users")
      .update({ onboarding: nextOnboarding })
      .eq("id", user.id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 400 });
    }

    return NextResponse.json({ setup: nextSetup, onboarding: nextOnboarding });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
