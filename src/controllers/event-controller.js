import { db } from "../models/db.js";

export const eventController = {
  index: {
    handler: async function (request, h) {
      const event = await db.eventStore.getEventById(request.params.id);
      const viewData = {
        title: "Event",
        event: event,
      };
      return h.view("event-view", viewData);
    },
  },

  addStadium: {
    handler: async function (request, h) {
      const event = await db.eventStore.getEventById(request.params.id);
      const newStadium = {
        stadium: request.payload.stadium,
        competition: request.payload.competition,
        rating: Number(request.payload.rating),
        city: request.payload.city,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
      };
      await db.stadiumStore.addStadium(event._id, newStadium);
      return h.redirect(`/event/${event._id}`);
    },
  },

  deleteStadium: {
    handler: async function(request, h) {
      const event = await db.eventStore.getEventById(request.params.id);
      await db.stadiumStore.deleteStadium(request.params.stadiumid);
      return h.redirect(`/event/${event._id}`);
    },
  },

};