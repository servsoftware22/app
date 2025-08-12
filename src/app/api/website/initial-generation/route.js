import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function POST(request) {
  try {
    const supabase = createServerClient(request);

    // Get the current user
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

    const body = await request.json();
    const {
      businessType,
      businessName,
      businessAddress,
      businessPhone,
      businessEmail,
      businessUnit,
    } = body;

    // Validate required fields
    if (!businessType || !businessName) {
      return NextResponse.json(
        { error: "Missing required business information" },
        { status: 400 }
      );
    }

    // Get the business record for this user
    const { data: business, error: businessError } = await supabase
      .from("business")
      .select("*")
      .eq("owner", user.id)
      .single();

    if (businessError || !business) {
      return NextResponse.json(
        { error: "Business not found" },
        { status: 404 }
      );
    }

    // Get the business type template from business_types table
    const { data: businessTypeData, error: businessTypeError } = await supabase
      .from("business_types")
      .select("*")
      .eq("name", businessType)
      .single();

    if (businessTypeError || !businessTypeData) {
      return NextResponse.json(
        { error: "Business type template not found" },
        { status: 404 }
      );
    }

    // Generate website content based on business type template
    const websiteData = {
      owner: user.id,
      business: business.id,
      admins: [user.id],
      home:
        businessTypeData.default_home ||
        generateDefaultHome(businessName, businessType),
      about:
        businessTypeData.default_about ||
        generateDefaultAbout(businessName, businessType),
      services:
        businessTypeData.default_services ||
        generateDefaultServices(businessType),
      faq: businessTypeData.default_faq || generateDefaultFAQ(businessType),
      seo:
        businessTypeData.default_seo ||
        generateDefaultSEO(businessName, businessType),
      contact: generateDefaultContact(
        businessName,
        businessAddress,
        businessPhone,
        businessEmail,
        businessUnit
      ),
      reviews: generateDefaultReviews(),
      cta: generateDefaultCTA(businessType),
      gallery: generateDefaultGallery(),
      blog: generateDefaultBlog(),
      portfolio: generateDefaultPortfolio(),
      team: generateDefaultTeam(),
      pricing: generateDefaultPricing(),
      locations: generateDefaultLocations(businessAddress),
      offers: generateDefaultOffers(),
      careers: generateDefaultCareers(),
      landing: generateDefaultLanding(),
      images: generateDefaultImages(),
      videos: generateDefaultVideos(),
      terms_of_service: generateDefaultTerms(),
      privacy_policy: generateDefaultPrivacy(),
      policies: generateDefaultPolicies(),
      header: generateDefaultHeader(businessName),
      footer: generateDefaultFooter(businessName),
      banner: generateDefaultBanner(businessName),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Create website record
    const { data: website, error: websiteError } = await supabase
      .from("websites")
      .insert(websiteData)
      .select()
      .single();

    if (websiteError) {
      console.error("Error creating website:", websiteError);
      return NextResponse.json(
        { error: "Failed to create website" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Website generated successfully",
      website: website,
    });
  } catch (error) {
    console.error("Error in site generator:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Helper functions to generate default content
function generateDefaultHome(businessName, businessType) {
  return {
    title: `Welcome to ${businessName}`,
    subtitle: `Professional ${businessType} services in your area`,
    hero_section: {
      title: `Your Trusted ${businessType} Partner`,
      subtitle: `Quality service, competitive pricing, and exceptional results`,
      cta_text: "Get Started Today",
      cta_link: "/contact",
    },
    features: [
      {
        title: "Professional Service",
        description: "Experienced team with years of expertise",
        icon: "star",
      },
      {
        title: "Quality Guaranteed",
        description: "We stand behind our work 100%",
        icon: "shield",
      },
      {
        title: "Competitive Pricing",
        description: "Fair and transparent pricing",
        icon: "dollar-sign",
      },
    ],
  };
}

function generateDefaultAbout(businessName, businessType) {
  return {
    title: `About ${businessName}`,
    subtitle: `Your local ${businessType} experts`,
    content: `We are a dedicated team of professionals committed to providing exceptional ${businessType} services. With years of experience and a passion for quality, we serve our community with integrity and excellence.`,
    mission: `To provide outstanding ${businessType} services that exceed our customers' expectations while maintaining the highest standards of quality and professionalism.`,
    values: [
      "Quality craftsmanship",
      "Customer satisfaction",
      "Integrity and honesty",
      "Continuous improvement",
    ],
  };
}

function generateDefaultServices(businessType) {
  return {
    title: "Our Services",
    subtitle: `Comprehensive ${businessType} solutions`,
    services: [
      {
        name: "Primary Service",
        description: "Our core service offering",
        price: "Contact for quote",
        features: ["Professional service", "Quality guarantee", "Expert team"],
      },
      {
        name: "Additional Service",
        description: "Specialized service option",
        price: "Contact for quote",
        features: [
          "Custom solutions",
          "Flexible scheduling",
          "Premium support",
        ],
      },
    ],
  };
}

function generateDefaultFAQ(businessType) {
  return {
    title: "Frequently Asked Questions",
    subtitle: "Common questions about our services",
    faqs: [
      {
        question: `What ${businessType} services do you offer?`,
        answer:
          "We offer a comprehensive range of services tailored to meet your specific needs. Contact us for a detailed consultation.",
      },
      {
        question: "How do I get started?",
        answer:
          "Simply reach out to us through our contact form or give us a call. We'll schedule a consultation to discuss your needs.",
      },
      {
        question: "What areas do you serve?",
        answer:
          "We serve the local area and surrounding communities. Contact us to confirm service availability in your location.",
      },
    ],
  };
}

function generateDefaultSEO(businessName, businessType) {
  return {
    title: `${businessName} - Professional ${businessType} Services`,
    description: `Professional ${businessType} services by ${businessName}. Quality work, competitive pricing, and exceptional customer service. Contact us today!`,
    keywords: [
      `${businessType}`,
      "professional services",
      "local business",
      businessName,
    ],
    og_title: `${businessName} - ${businessType} Services`,
    og_description: `Professional ${businessType} services in your area. Quality work guaranteed.`,
    og_image: "/images/og-default.jpg",
  };
}

function generateDefaultContact(businessName, address, phone, email, unit) {
  return {
    title: "Contact Us",
    subtitle: "Get in touch with our team",
    address: {
      street: address,
      unit: unit || "",
      city: "",
      state: "",
      zip: "",
    },
    phone: phone,
    email:
      email ||
      `info@${businessName.toLowerCase().replace(/[^a-z0-9]/g, "")}\.com`,
    hours: {
      monday: "8:00 AM - 6:00 PM",
      tuesday: "8:00 AM - 6:00 PM",
      wednesday: "8:00 AM - 6:00 PM",
      thursday: "8:00 AM - 6:00 PM",
      friday: "8:00 AM - 6:00 PM",
      saturday: "9:00 AM - 4:00 PM",
      sunday: "Closed",
    },
  };
}

function generateDefaultReviews() {
  return {
    title: "What Our Customers Say",
    subtitle: "Don't just take our word for it",
    reviews: [
      {
        name: "John D.",
        rating: 5,
        comment: "Excellent service and quality work. Highly recommended!",
        date: "2024-01-15",
      },
      {
        name: "Sarah M.",
        rating: 5,
        comment: "Professional, reliable, and great results. Will use again!",
        date: "2024-01-10",
      },
    ],
  };
}

function generateDefaultCTA(businessType) {
  return {
    title: `Ready for Professional ${businessType} Services?`,
    subtitle: "Contact us today for a free consultation",
    button_text: "Get Started",
    button_link: "/contact",
  };
}

function generateDefaultGallery() {
  return {
    title: "Our Work",
    subtitle: "Examples of our quality craftsmanship",
    images: [],
  };
}

function generateDefaultBlog() {
  return {
    title: "Latest News & Tips",
    subtitle: "Stay updated with industry insights",
    posts: [],
  };
}

function generateDefaultPortfolio() {
  return {
    title: "Our Portfolio",
    subtitle: "Showcasing our best work",
    projects: [],
  };
}

function generateDefaultTeam() {
  return {
    title: "Our Team",
    subtitle: "Meet the professionals behind our success",
    members: [],
  };
}

function generateDefaultPricing() {
  return {
    title: "Our Pricing",
    subtitle: "Transparent and competitive rates",
    packages: [],
  };
}

function generateDefaultLocations(address) {
  return {
    title: "Service Areas",
    subtitle: "Where we provide our services",
    locations: [
      {
        name: "Primary Service Area",
        address: address,
        description: "Our main service area",
      },
    ],
  };
}

function generateDefaultOffers() {
  return {
    title: "Special Offers",
    subtitle: "Limited time deals and promotions",
    offers: [],
  };
}

function generateDefaultCareers() {
  return {
    title: "Join Our Team",
    subtitle: "Career opportunities with us",
    positions: [],
  };
}

function generateDefaultLanding() {
  return {
    title: "Welcome",
    subtitle: "Your trusted service partner",
    sections: [],
  };
}

function generateDefaultImages() {
  return {
    logo: null,
    hero_image: null,
    gallery: [],
    team_photos: [],
  };
}

function generateDefaultVideos() {
  return {
    hero_video: null,
    testimonials: [],
    process_videos: [],
  };
}

function generateDefaultTerms() {
  return {
    title: "Terms of Service",
    content: "Standard terms of service content will be generated here.",
    last_updated: new Date().toISOString(),
  };
}

function generateDefaultPrivacy() {
  return {
    title: "Privacy Policy",
    content: "Standard privacy policy content will be generated here.",
    last_updated: new Date().toISOString(),
  };
}

function generateDefaultPolicies() {
  return {
    title: "Company Policies",
    policies: [],
  };
}

function generateDefaultHeader(businessName) {
  return {
    logo: businessName,
    navigation: [
      { name: "Home", link: "/" },
      { name: "About", link: "/about" },
      { name: "Services", link: "/services" },
      { name: "Contact", link: "/contact" },
    ],
    cta_button: {
      text: "Get Quote",
      link: "/contact",
    },
  };
}

function generateDefaultFooter(businessName) {
  return {
    company_name: businessName,
    description: "Professional services you can trust",
    links: {
      services: ["Primary Service", "Additional Service"],
      company: ["About", "Contact", "Careers"],
      support: ["FAQ", "Terms", "Privacy"],
    },
    contact: {
      phone: "",
      email: "",
      address: "",
    },
    social_media: {
      facebook: null,
      twitter: null,
      instagram: null,
      linkedin: null,
    },
  };
}

function generateDefaultBanner(businessName) {
  return {
    title: `Welcome to ${businessName}`,
    subtitle: "Professional services you can trust",
    cta_text: "Get Started",
    cta_link: "/contact",
    background_image: null,
  };
}
