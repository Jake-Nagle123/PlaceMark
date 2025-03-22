import { userApi } from "./api/user-api.js";
import { eventApi } from "./api/event-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  { method: "POST", path: "/api/events", config: eventApi.create },
  { method: "DELETE", path: "/api/events", config: eventApi.deleteAll },
  { method: "GET", path: "/api/events", config: eventApi.find },
  { method: "GET", path: "/api/events/{id}", config: eventApi.findOne },
  { method: "DELETE", path: "/api/events/{id}", config: eventApi.deleteOne },
];