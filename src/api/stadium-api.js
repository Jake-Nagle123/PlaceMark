import { Boom } from "@hapi/boom";
import { db } from "../models/db.js";

export const stadiumApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const stadiums = await db.stadiumStore.getAllStadiums();
        return stadiums;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findOne: {
    auth: false,
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
  },

  create: {
    auth: false,
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
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.stadiumStore.deleteAllStadiums();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteOne: {
    auth: false,
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
  },
};