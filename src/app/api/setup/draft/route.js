import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

// Get user's current setup draft (users.onboarding.draft)
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
    const draft = onboarding.draft || {};
    return NextResponse.json({ draft });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Merge partial draft fields into users.onboarding.draft
// Body: { draft: { ...partialFields } }
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
    const partial = body?.draft || {};
    if (!partial || typeof partial !== "object" || Array.isArray(partial)) {
      return NextResponse.json(
        { error: "Invalid draft payload" },
        { status: 400 }
      );
    }

    const { data: userRow, error: userError } = await supabase
      .from("users")
      .select("onboarding")
      .eq("id", user.id)
      .single();

    if (userError || !userRow) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const prevOnboarding = userRow.onboarding || {};
    const prevDraft = prevOnboarding.draft || {};
    const nextDraft = { ...prevDraft, ...partial };
    const nextOnboarding = { ...prevOnboarding, draft: nextDraft };

    const { error: updateError } = await supabase
      .from("users")
      .update({ onboarding: nextOnboarding })
      .eq("id", user.id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 400 });
    }

    return NextResponse.json({ draft: nextDraft });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
