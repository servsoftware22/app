import { createClient } from "@supabase/supabase-js";
import {
  createBrowserClient,
  createServerClient as createSSRServerClient,
} from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Client-side Supabase client
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

// Server-side Supabase client
export const createServerClient = (request) => {
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
