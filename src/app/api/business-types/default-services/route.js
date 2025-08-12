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

    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");
    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'name' parameter" },
        { status: 400 }
      );
    }

    const { data: row, error } = await supabase
      .from("business_types")
      .select("id, name, default_services")
      .eq("name", name)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const services = Array.isArray(row?.default_services)
      ? row.default_services
      : [];
    return NextResponse.json({ services });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
