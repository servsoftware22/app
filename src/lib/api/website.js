// Website API functions

import { apiRequest } from "./utils.js";

export const websiteAPI = {
  getSettings: () => apiRequest("/website/settings"),
  updateSettings: (settings) =>
    apiRequest("/website/settings", {
      method: "PUT",
      body: JSON.stringify(settings),
    }),
  getTemplates: () => apiRequest("/website/templates"),
  getTemplateById: (id) => apiRequest(`/website/templates/${id}`),
  publishWebsite: () =>
    apiRequest("/website/publish", {
      method: "POST",
    }),
  getCustomDomain: () => apiRequest("/website/domain"),
  updateCustomDomain: (domain) =>
    apiRequest("/website/domain", {
      method: "PUT",
      body: JSON.stringify({ domain }),
    }),
};
