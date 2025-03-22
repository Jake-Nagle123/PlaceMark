import { Boom } from "@hapi/boom";
import { db } from "../models/db.js";

export const eventApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
    },
  },

  findOne: {
    auth: false,
    async handler(request) {
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
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