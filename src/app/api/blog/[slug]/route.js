import { createClient } from "@supabase/supabase-js";
import { canRunAPI } from "@/lib/supabase";

// Only create Supabase client if environment variables are available
const createSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  return createClient(supabaseUrl, serviceRoleKey);
};

export async function GET(request, { params }) {
  // Check if we can run this API route during build
  if (!canRunAPI()) {
    return Response.json(
      { error: "API not available during build" },
      { status: 503 }
    );
  }

  try {
    const supabase = createSupabaseClient();

    // If we can't create a Supabase client (e.g., during build), return an error
    if (!supabase) {
      return Response.json(
        { error: "Database connection not available" },
        { status: 503 }
      );
    }

    const { slug } = params;

    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      console.error("Error fetching blog:", error);
      return Response.json({ error: "Blog not found" }, { status: 404 });
    }

    if (!data) {
      return Response.json({ error: "Blog not found" }, { status: 404 });
    }

    return Response.json({ blog: data });
  } catch (error) {
    console.error("Error in blog API:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
