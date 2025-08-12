import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function POST(request) {
  try {
    const body = await request.json();
    const { first_name, last_name, email, company, phone, job_title, notes } =
      body;

    // Validation
    const errors = [];

    // Required fields
    if (!first_name?.trim()) errors.push("First name is required");
    if (!last_name?.trim()) errors.push("Last name is required");
    if (!email?.trim()) errors.push("Email is required");
    if (!phone?.trim()) errors.push("Phone is required");
    if (!notes?.trim()) errors.push("Message is required");

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      errors.push("Please enter a valid email address");
    }

    // Phone validation - clean and check for 10-11 digits
    const cleanPhone = phone?.replace(/[\s\-\(\)\.]/g, "");
    if (
      phone &&
      (!cleanPhone ||
        cleanPhone.length < 10 ||
        cleanPhone.length > 11 ||
        !/^\d+$/.test(cleanPhone))
    ) {
      errors.push("Please enter a valid US phone number (10-11 digits)");
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { error: "Validation failed", details: errors },
        { status: 400 }
      );
    }

    // Insert into database
    const supabase = createServerClient();
    const { error } = await supabase.from("contacts").insert([
      {
        type: "contact",
        first_name: first_name.trim(),
        last_name: last_name.trim(),
        email: email.trim().toLowerCase(),
        company: company?.trim() || null,
        phone: phone?.replace(/[\s\-\(\)\.]/g, ""),
        job_title: job_title?.trim() || null,
        notes: notes.trim(),
        tags: ["website-contact"],
      },
    ]);

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to save contact information" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Contact information saved successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
