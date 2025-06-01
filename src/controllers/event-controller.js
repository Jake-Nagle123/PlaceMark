import { db } from "../models/db.js";
import { StadiumSpec, ReviewSpec } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";

export const eventController = {
  // Public POIs Methods
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

  publicStadiums: {
    handler: async function (request, h) {
      const stadiums = await db.stadiumStore.getAllPublicStadiums();
      const viewData = {
        title: "Public Stadiums",
        stadiums: stadiums,
      };
      return h.view("publicstadium-view", viewData);
    },
  },

  addStadium: {
    validate: {
      payload: StadiumSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const event = await db.eventStore.getEventById(request.params.id);
        return h.view("event-view", { title: "Add stadium error", event: event, errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const event = await db.eventStore.getEventById(request.params.id);
      const newStadium = {
        stadium: request.payload.stadium,
        competition: request.payload.competition,
        rating: Number(request.payload.rating),
        city: request.payload.city,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
        stadiumType: request.payload.stadiumType,
      };
      await db.stadiumStore.addStadium(event._id, newStadium);
      return h.redirect(`/event/${event._id}`);
    },
  },

  addReview: {
    validate: {
      payload: ReviewSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const event = await db.eventStore.getEventById(request.params.id);
        return h.view("event-view", { title: "Add review error", event: event, errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const event = await db.eventStore.getEventById(request.params.id);
      const newReview = {
        reviewText: request.payload.reviewText,
        createdAt: Date.now(),
      };
      await db.reviewStore.addReview(event._id, newReview);
      return h.redirect(`/event/${event._id}`);
    },
  },

  uploadImage: {
    handler: async function (request, h) {
      try {
        const event = await db.eventStore.getEventById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          event.img = url;
          await db.eventStore.updateEvent(event);
        }
        return h.redirect(`/event/${event._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/event/${request.params.id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },

  deleteStadium: {
    handler: async function(request, h) {
      const event = await db.eventStore.getEventById(request.params.id);
      await db.stadiumStore.deleteStadium(request.params.stadiumid);
      return h.redirect(`/event/${event._id}`);
    },
  },
  
  // Private POIs Methods
  // --> Private Index
  privateIndex: {    
    handler: async function (request, h) {
      const event = await db.eventStore.getEventById(request.params.id);
      const viewData = {
        title: "Event",
        event: event,
        user: loggedInUser,
      };
      return h.view("event-view", viewData);
    },
  },

  // Private POIs Methods
  // --> Private addStadium
  privateAddStadium: {
    validate: {
      payload: StadiumSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const event = await db.eventStore.getEventById(request.params.id);
        return h.view("event-view", { title: "Add stadium error", event: event, errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const event = await db.eventStore.getEventById(request.params.id);
      const newStadium = {
        stadium: request.payload.stadium,
        competition: request.payload.competition,
        rating: Number(request.payload.rating),
        city: request.payload.city,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
        userid: loggedInUser._id,
      };
      await db.stadiumStore.addStadium(event._id, newStadium);
      return h.redirect(`/event/${event._id}`);
    },
  },

};