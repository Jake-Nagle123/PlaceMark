import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const events = await db.eventStore.getAllEvents();
      const viewData = {
        title: "Event Dashboard",
        events: events,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addEvent: {
    handler: async function (request, h) {
      const newEvent = {
        title: request.payload.title,
      };
      await db.eventStore.addEvent(newEvent);
      return h.redirect("/dashboard");
    },
  },
};