import { createClient } from "@supabase/supabase-js";
import {
  createBrowserClient,
  createServerClient as createSSRServerClient,
} from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if we're in a build environment
const isBuildTime =
  process.env.NODE_ENV === "production" &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL;

// Utility to check if we can run API routes
export const canRunAPI = () => {
  return !isBuildTime && supabaseUrl && supabaseAnonKey;
};

// Client-side Supabase client
export const supabase = isBuildTime
  ? null
  : createBrowserClient(supabaseUrl, supabaseAnonKey);

// Server-side Supabase client
export const createServerClient = (request) => {
  // Return null during build time to prevent errors
  if (isBuildTime) {
    return null;
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase environment variables are not set");
    return null;
  }

  if (request) {
    // For API routes with request context
    return createSSRServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll: () => {
          const cookies = [];
          request.headers
            .get("cookie")
            ?.split(";")
            .forEach((cookie) => {
              const [name, value] = cookie.trim().split("=");
              if (name && value) {
                cookies.push({ name, value });
              }
            });
          return cookies;
        },
        setAll: () => {},
      },
    });
  } else {
    // For server components without request context
    return createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }
};
