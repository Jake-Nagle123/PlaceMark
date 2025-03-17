import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const events = await db.eventStore.getUserEvents(loggedInUser._id);
      const viewData = {
        title: "Event Dashboard",
        user: loggedInUser,
        events: events,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addEvent: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newEvent = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.eventStore.addEvent(newEvent);
      return h.redirect("/dashboard");
    },
  },
};