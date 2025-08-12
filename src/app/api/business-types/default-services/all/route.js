import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function GET(request) {
  try {
    const supabase = createServerClient(request);
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { data, error } = await supabase
      .from("business_types")
      .select("id, name, default_services");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const all = Array.isArray(data) ? data : [];
    const collected = [];
    const seen = new Set();
    for (const row of all) {
      const list = Array.isArray(row?.default_services)
        ? row.default_services
        : [];
      for (const svc of list) {
        const key = svc?.id || `${svc?.name ?? ""}`.toLowerCase();
        if (key && !seen.has(key)) {
          seen.add(key);
          collected.push(svc);
        }
      }
    }

    return NextResponse.json({ services: collected });
  } catch (e) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
