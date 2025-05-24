import { Boom } from "@hapi/boom";
import { IdSpec, EventArraySpec, EventSpec, EventSpecPlus } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";

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
    tags: ["api"],
    response: { schema: EventArraySpec, failAction: validationError },
    description: "Get all events",
    notes: "Returns all events",
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
    tags: ["api"],
    description: "Find an Event",
    notes: "Returns an event",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: EventSpecPlus, failAction: validationError },
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
    tags: ["api"],
    description: "Create an Event",
    notes: "Returns the newly created event",
    validate: { payload: EventSpec, failAction: validationError },
    response: { schema: EventSpecPlus, failAction: validationError },
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
    tags: ["api"],
    description: "Delete an event",
    validate: { params: { id: IdSpec }, failAction: validationError },
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
    tags: ["api"],
    description: "Delete all EventApi",
  },
};