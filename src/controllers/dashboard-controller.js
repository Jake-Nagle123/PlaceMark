import { db } from "../models/db.js";
import { EventSpec } from "../models/joi-schemas.js";

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
    validate: {
      payload: EventSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add Event error", errors: error.details }).takeover().code(400);
      },
    },
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

  deleteEvent: {
    handler: async function (request, h) {
      const event = await db.eventStore.getEventById(request.params.id);
      await db.eventStore.deleteEventById(event._id);
      return h.redirect("/dashboard");
    },
  },

};