// Auth API functions

import { apiRequest } from "./utils.js";

export const authAPI = {
  login: (email, password) =>
    apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  signup: (email, password, phone, userId, fullName) =>
    apiRequest("/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password, phone, userId, fullName }),
    }),
  step2: (
    userId,
    businessName,
    businessType,
    businessPhone,
    businessAddress,
    businessUnit
  ) =>
    apiRequest("/auth/signup/step2", {
      method: "POST",
      body: JSON.stringify({
        userId,
        businessName,
        businessType,
        businessPhone,
        businessAddress,
        businessUnit,
      }),
    }),
  checkProgress: () =>
    apiRequest("/auth/signup/check-progress", {
      method: "POST",
    }),
  resetPassword: (email) =>
    apiRequest("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),
  updatePassword: (password) =>
    apiRequest("/auth/update-password", {
      method: "POST",
      body: JSON.stringify({ password }),
    }),
  logout: () =>
    apiRequest("/auth/logout", {
      method: "POST",
    }),
  getUser: () => apiRequest("/auth/user"),
  checkAuth: () => apiRequest("/auth/check"),
};
