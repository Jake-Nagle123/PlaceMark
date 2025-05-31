import { db } from "../models/db.js";
import { IdSpec, EventSpec } from "../models/joi-schemas.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const events = await db.eventStore.getUserEvents(loggedInUser._id);
      const publicEvents = events.filter(event => event.eventType === "public");
      const privateEvents = events.filter(event => event.eventType === "private");
      const viewData = {
        title: "Event Dashboard",
        user: loggedInUser,
        publicEvents: publicEvents,
        privateEvents: privateEvents,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addEvent: {
    auth: "session",
    validate: {
      payload: EventSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add Public Event error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newEvent = {
        userid: loggedInUser._id,
        title: request.payload.title,
        eventType: "public",
      };
      await db.eventStore.addEvent(newEvent);
      return h.redirect("/dashboard");
    },
  },

  privateAddEvent: {
    auth: "session",
    validate: {
      payload: EventSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add Private Event error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newEvent = {
        userid: loggedInUser._id,
        title: request.payload.title,
        eventType: "private",
      };
      await db.eventStore.addEvent(newEvent);
      return h.redirect("/dashboard");
    },
  },

  deleteEvent: {
    auth: {
      strategy: "session",
    },
    handler: async function (request, h) {
      try {
        const event = await db.eventStore.getEventById(request.params.id);
        if (!event) {
          return h.view("dashboard-view", { title: "No Private Event with this id"}).code(404);
      }
      await db.eventStore.deleteEventById(event._id);
      return h.redirect("/dashboard");
    } catch (error) {
      console.log(err);
      return h.view("dashboard-view", { title: "Delete Public Event Error" }).code(500);
      }
    },
  },



  deletePrivateEvent: {
    auth: {
      strategy: "session",
    },
    handler: async function (request, h) {
      try {
        const event = await db.eventStore.getEventById(request.params.id);
        if (!event) {
          return h.view("dashboard-view", { title: "No Private Event with this id"}).code(404);
      }          
      await db.eventStore.deleteEventById(event._id);
      return h.redirect("/dashboard");
    } catch (err) {
      console.log(err);
      return h.view("dashboard-view", { title: "Delete Private Event Error" }).code(500);
      }
    },
  },

};