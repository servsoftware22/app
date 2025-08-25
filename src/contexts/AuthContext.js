"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const {
          data: { session: initialSession },
        } = await supabase.auth.getSession();
        setSession(initialSession);
        setUser(initialSession?.user ?? null);

        // If we have a user, check their users table row
        if (initialSession?.user) {
          await checkUserData(initialSession.user);
        }
      } catch (error) {
        console.log("No initial session found");
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.id);
      setSession(session);
      setUser(session?.user ?? null);

      // If we have a user, check their users table row
      if (session?.user) {
        await checkUserData(session.user);
      } else {
        // User signed out, clear user data
        setUserData(null);
        setIsOwner(false);
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      // Always try to sign in after signup to establish session
      if (data.user) {
        // Wait a moment for the signup to complete
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Try to sign in to establish session
        const { data: signInData, error: signInError } =
          await supabase.auth.signInWithPassword({
            email,
            password,
          });

        if (signInError) {
          console.error("Auto sign-in after signup failed:", signInError);
        } else {
          console.log("Auto sign-in successful after signup");
        }
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const getCurrentUser = async () => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) throw error;
      return { user, error: null };
    } catch (error) {
      return { user: null, error };
    }
  };

  const checkUserData = async (authUser) => {
    try {
      console.log(
        "Checking user data for authenticated user:",
        authUser.id,
        authUser.email
      );

      // Get user data from users table
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("id", authUser.id)
        .single();

      if (userError) {
        if (userError.code === "PGRST116") {
          // No user record found
          console.log(
            "User authenticated but NO users table row found for:",
            authUser.id,
            authUser.email
          );
          setUserData(null);
          setIsOwner(false);
        } else {
          // Other database error
          console.error("Error checking users table:", userError);
          setUserData(null);
          setIsOwner(false);
        }
        return;
      }

      // User record found
      console.log("User authenticated and users table row found:", {
        userId: authUser.id,
        email: authUser.email,
        userData: userData,
      });

      setUserData(userData);

      // Check if user has owner role
      const isOwnerRole = userData?.type?.role === "owner";
      setIsOwner(isOwnerRole);

      if (isOwnerRole) {
        console.log("User has owner role");
      } else {
        console.log("User does not have owner role, type:", userData?.type);
      }
    } catch (error) {
      console.error("Error in checkUserData:", error);
      setUserData(null);
      setIsOwner(false);
    }
  };

  const value = {
    user,
    session,
    loading,
    userData,
    isOwner,
    signUp,
    signIn,
    signOut,
    getCurrentUser,
    checkUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
