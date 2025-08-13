import { supabase } from "@/lib/supabase";

/**
 * Fetches website data from Supabase based on domain
 * @param {string} domain - The domain/subdomain to fetch
 * @returns {Promise<Object>} Website data
 */
export async function fetchWebsiteData(domain) {
  try {
    const { data, error } = await supabase
      .from("websites")
      .select("*")
      .eq("domains->>subdomain", domain)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error fetching website data:", error);
    throw error;
  }
}

/**
 * Determines the appropriate template based on website data
 * @param {Object} websiteData - Website data from Supabase
 * @returns {string} Template name
 */
export function determineTemplate(websiteData) {
  // This could be based on business type, user preference, or other factors
  const businessType = websiteData.business_type;
  const userPreference = websiteData.template;

  if (userPreference) {
    return userPreference;
  }

  // Default template selection based on business type
  if (businessType) {
    const businessTypeLower = businessType.toLowerCase();

    if (
      businessTypeLower.includes("luxury") ||
      businessTypeLower.includes("premium")
    ) {
      return "Luxury";
    } else if (
      businessTypeLower.includes("industrial") ||
      businessTypeLower.includes("construction")
    ) {
      return "Industrial";
    }
  }

  return "Urban"; // Default template
}

/**
 * Generates website metadata based on website data
 * @param {Object} websiteData - Website data from Supabase
 * @returns {Object} Metadata object
 */
export function generateWebsiteMetadata(websiteData) {
  const domains = websiteData.domains;

  return {
    title:
      domains?.seo?.meta_title ||
      `${websiteData.business_name || "Professional Services"}`,
    description:
      domains?.seo?.meta_description ||
      `Professional services by ${websiteData.business_name || "our team"}`,
    canonicalUrl:
      domains?.seo?.canonical_url ||
      `https://${domains?.subdomain}.toolpage.site`,
    ogImage: domains?.seo?.og_image,
    twitterCard: domains?.seo?.twitter_card || "summary_large_image",
    structuredData: domains?.seo?.structured_data || {},
  };
}

/**
 * Generates website configuration based on website data
 * @param {Object} websiteData - Website data from Supabase
 * @returns {Object} Configuration object
 */
export function generateWebsiteConfig(websiteData) {
  const domains = websiteData.domains;

  return {
    businessName: websiteData.business_name,
    businessType: websiteData.business_type,
    contactEmail: websiteData.contact_email,
    contactPhone: websiteData.contact_phone,
    address: websiteData.address,
    services: websiteData.services || [],
    team: websiteData.team || [],
    testimonials: websiteData.testimonials || [],
    socialMedia: domains?.integrations?.social_media_links || [],
    customCSS: domains?.integrations?.custom_css,
    customJS: domains?.integrations?.custom_js,
    analytics: {
      googleAnalytics: domains?.analytics?.google_analytics_id,
      googleTagManager: domains?.analytics?.google_tag_manager_id,
      facebookPixel: domains?.analytics?.facebook_pixel_id,
    },
    seo: {
      robotsTxt: domains?.settings?.robots_txt,
      sitemapEnabled: domains?.settings?.sitemap_enabled,
      seoOptimized: domains?.settings?.seo_optimized,
    },
    performance: {
      cdnEnabled: domains?.performance?.cdn_enabled,
      imageOptimization: domains?.performance?.image_optimization,
      minificationEnabled: domains?.performance?.minification_enabled,
    },
  };
}

/**
 * Validates website data for required fields
 * @param {Object} websiteData - Website data from Supabase
 * @returns {Object} Validation result
 */
export function validateWebsiteData(websiteData) {
  const errors = [];

  if (!websiteData.business_name) {
    errors.push("Business name is required");
  }

  if (!websiteData.domains?.subdomain) {
    errors.push("Domain subdomain is required");
  }

  if (!websiteData.domains?.status?.active) {
    errors.push("Website domain is not active");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Gets the full domain URL for a website
 * @param {Object} websiteData - Website data from Supabase
 * @returns {string} Full domain URL
 */
export function getWebsiteUrl(websiteData) {
  const domains = websiteData.domains;
  return (
    domains?.full_domain ||
    domains?.primary_domain ||
    `https://${domains?.subdomain}.toolpage.site`
  );
}
