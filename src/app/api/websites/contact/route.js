import { createServerClient } from "@/lib/supabase";

export async function POST(request) {
  try {
    const { name, email, phone, message, businessId } = await request.json();

    // Validate required fields
    if (!name || !email || !businessId) {
      return Response.json(
        {
          error:
            "Missing required fields: name, email, and businessId are required",
        },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // Use the business ID directly from the request
    const businessUuid = businessId;

    // Check if client already exists with same business UUID and email
    const { data: existingClient, error: checkError } = await supabase
      .from("clients")
      .select("id, notes, details, history")
      .eq("business", businessUuid)
      .eq("email", email)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      // PGRST116 is "not found" error
      console.error("Error checking for existing client:", checkError);
      return Response.json(
        { error: "Failed to check for existing client" },
        { status: 500 }
      );
    }

    if (existingClient) {
      // Update existing client record
      const currentNotes = existingClient.notes || {};
      const currentDetails = existingClient.details || {};
      const currentHistory = existingClient.history || [];

      const newContactEntry = {
        action: "contact_form_submission",
        description: "Submitted contact form through website",
        timestamp: new Date().toISOString(),
        source: "website_contact_form",
        message_preview:
          message.substring(0, 100) + (message.length > 100 ? "..." : ""),
      };

      const updatedNotes = {
        ...currentNotes,
        latest_contact: {
          message: message,
          source: "website_contact_form",
          timestamp: new Date().toISOString(),
        },
        contact_count: (currentNotes.contact_count || 0) + 1,
      };

      const updatedDetails = {
        ...currentDetails,
      };

      const updatedHistory = [...currentHistory, newContactEntry];

      // Update the existing client
      const { data: updatedClient, error: updateError } = await supabase
        .from("clients")
        .update({
          notes: updatedNotes,
          details: updatedDetails,
          history: updatedHistory,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingClient.id)
        .select()
        .single();

      if (updateError) {
        console.error("Client update error:", updateError);
        return Response.json(
          { error: "Failed to update client record" },
          { status: 500 }
        );
      }

      return Response.json(
        {
          message:
            "Contact form submitted successfully - existing client updated",
          clientId: updatedClient.id,
          action: "updated",
        },
        { status: 200 }
      );
    } else {
      // Create new client record
      const { data: clientData, error: clientError } = await supabase
        .from("clients")
        .insert([
          {
            business: businessUuid,
            name: name,
            email: email,
            phone: phone || null,
            address: null,
            notes: {
              initial_contact: {
                message: message,
                source: "website_contact_form",
                timestamp: new Date().toISOString(),
              },
              contact_count: 1,
            },
            details: {},
            preferences: {},
            history: [
              {
                action: "initial_contact",
                description: "Contacted business through website contact form",
                timestamp: new Date().toISOString(),
                source: "website_contact_form",
                message_preview:
                  message.substring(0, 100) +
                  (message.length > 100 ? "..." : ""),
              },
            ],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (clientError) {
        console.error("Client creation error:", clientError);
        return Response.json(
          { error: "Failed to create client record" },
          { status: 500 }
        );
      }

      return Response.json(
        {
          message: "Contact form submitted successfully - new client created",
          clientId: clientData.id,
          action: "created",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Contact form submission error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
