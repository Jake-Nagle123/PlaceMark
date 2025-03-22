import { Boom } from "@hapi/boom";
import { db } from "../models/db.js";

export const eventApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const events = await db.eventStore.getAllEvents();
        return events;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const event = await db.eventStore.getEventById(request.params.id);
        if (!event) {
          return Boom.notFound("No Event with this id");
        }
        return event;
      } catch (err) {
        return Boom.serverUnavailable("No Event with this id");
      }
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const event = request.payload;
        const newEvent = await db.eventStore.addEvent(event);
        if (newEvent) {
          return h.response(newEvent).code(201);
        }
        return Boom.badImplementation("error creating event");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const event = await db.eventStore.getEventById(request.params.id);
        if (!event) {
          return Boom.notFound("No Event with this id");
        }
        await db.eventStore.deleteEventById(event._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Event with this id");
      }
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.eventStore.deleteAllEvents();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
};