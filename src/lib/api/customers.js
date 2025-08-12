// Customers API functions

import { apiRequest } from "./utils.js";

export const customersAPI = {
  getAll: () => apiRequest("/customers"),
  getById: (id) => apiRequest(`/customers/${id}`),
  create: (customerData) =>
    apiRequest("/customers", {
      method: "POST",
      body: JSON.stringify(customerData),
    }),
  update: (id, customerData) =>
    apiRequest(`/customers/${id}`, {
      method: "PUT",
      body: JSON.stringify(customerData),
    }),
  delete: (id) =>
    apiRequest(`/customers/${id}`, {
      method: "DELETE",
    }),
};
