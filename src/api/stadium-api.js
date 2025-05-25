import { Boom } from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, StadiumSpec, StadiumSpecPlus, StadiumArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const stadiumApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const stadiums = await db.stadiumStore.getAllStadiums();
        return stadiums;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: StadiumArraySpec, failAction: validationError },
    description: "Get all stadiumApi",
    notes: "Returns all stadiumApi",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const stadium = await db.stadiumStore.getStadiumById(request.params.id);
        if (!stadium) {
          return Boom.notFound("No stadium with this id");
        }
        return stadium;
      } catch (err) {
        return Boom.serverUnavailable("No stadium with this id");
      }
    },
    tags: ["api"],
    description: "Find a Stadium",
    notes: "Returns a Stadium",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: StadiumSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const stadium = await db.stadiumStore.addStadium(request.params.id, request.payload);
        if (stadium) {
          return h.response(stadium).code(201);
        }
        return Boom.badImplementation("error creating stadium");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a stadium",
    notes: "Returns the newly created stadium",
    validate: { payload: StadiumSpec },
    response: { schema: StadiumSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.stadiumStore.deleteAllStadiums();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all stadiumApi",
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const stadium = await db.stadiumStore.getStadiumById(request.params.id);
        if (!stadium) {
          return Boom.notFound("No Stadium with this id");
        }
        await db.stadiumStore.deleteStadium(stadium._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Stadium with this id");
      }
    },
    tags: ["api"],
    description: "Delete a stadium",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};