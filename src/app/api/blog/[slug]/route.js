import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function GET(request, { params }) {
  try {
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
