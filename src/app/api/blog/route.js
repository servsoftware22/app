import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("published_at", { ascending: false });

    if (error) {
      console.error("Error fetching blogs:", error);
      return Response.json({ error: "Failed to fetch blogs" }, { status: 500 });
    }

    return Response.json({ blogs: data });
  } catch (error) {
    console.error("Error in blog API:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
