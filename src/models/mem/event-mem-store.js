import { v4 } from "uuid";
import { stadiumMemStore } from "./stadium-mem-store.js";

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
    const list = events.find((event) => event._id === id);
    list.stadiums = await stadiumMemStore.getStadiumsByEventId(list._id);
    return list;
  },

  async getUserEvents(userid) {
    return events.filter((event) => event.userid === userid);
  },

  async deleteEventById(id) {
    const index = events.findIndex((event) => event._id === id);
    events.splice(index, 1);
  },

  async deleteAllEvents() {
    events = [];
  },
};