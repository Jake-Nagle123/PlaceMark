import Mongoose from "mongoose";
import { Event } from "./event.js";
import { stadiumMongoStore } from "./stadium-mongo-store.js";

export const eventMongoStore = {
  async getAllEvents() {
    const events = await Event.find().lean();
    return events;
  },

  async getEventById(id) {
    if (Mongoose.isValidObjectId(id)) {
      const event = await Event.findOne({ _id: id }).lean();
      if (event) {
        event.stadiums = await stadiumMongoStore.getStadiumsByEventId(event._id);
      }
      return event;
    }
    return null;
  },

  async addEvent(event) {
    const newEvent = new Event(event);
    const eventObj = await newEvent.save();
    return this.getEventById(eventObj._id);
  },

  async getUserEvents(id) {
    const event = await Event.find({ userid: id }).lean();
    return event;
  },

  async updateEvent(updatedEvent) {
    const event = await Event.findOne({ _id: updatedEvent._id });
    event.title = updatedEvent.title;
    event.img = updatedEvent.img;
    await event.save();
  },

  async deleteEventById(id) {
    try {
      await Event.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllEvents() {
    await Event.deleteMany({});
  }
};