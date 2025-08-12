// Dashboard API functions

import { apiRequest } from "./utils.js";

export const dashboardAPI = {
  getUser: () => apiRequest("/dashboard/user"),
};
