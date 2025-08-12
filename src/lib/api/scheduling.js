// Scheduling API functions

import { apiRequest } from "./utils.js";

export const schedulingAPI = {
  getAppointments: () => apiRequest("/scheduling/appointments"),
  getAppointmentById: (id) => apiRequest(`/scheduling/appointments/${id}`),
  createAppointment: (appointmentData) =>
    apiRequest("/scheduling/appointments", {
      method: "POST",
      body: JSON.stringify(appointmentData),
    }),
  updateAppointment: (id, appointmentData) =>
    apiRequest(`/scheduling/appointments/${id}`, {
      method: "PUT",
      body: JSON.stringify(appointmentData),
    }),
  deleteAppointment: (id) =>
    apiRequest(`/scheduling/appointments/${id}`, {
      method: "DELETE",
    }),
  getAvailability: () => apiRequest("/scheduling/availability"),
};
