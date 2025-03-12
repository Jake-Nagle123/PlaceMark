import { v4 } from "uuid";

let events = [];

export const eventMemStore = {
  async getAllEvents() {
    return events;
  },

  async addEvent(event) {
    event._id = v4();
    events.push(event);
    return event;
  },

  async getEventById(id) {
    return events.find((event) => event._id === id);
  },

  async deleteEventById(id) {
    const index = events.findIndex((event) => event._id === id);
    events.splice(index, 1);
  },

  async deleteAllEvents() {
    events = [];
  },
};