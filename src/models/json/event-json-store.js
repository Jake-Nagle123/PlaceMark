import { v4 } from "uuid";
import { db } from "./store-utils.js";
import { stadiumJsonStore } from "./stadium-json-store.js";

export const eventJsonStore = {
  async getAllEvents() {
    await db.read();
    return db.data.events;
  },

  async addEvent(event) {
    await db.read();
    event._id = v4();
    db.data.events.push(event);
    await db.write();
    return event;
  },

  async getEventById(id) {
    await db.read();
    let list = db.data.events.find((event) => event._id === id);
    if (list) {
      list.stadiums = await stadiumJsonStore.getStadiumsByEventId(list._id);
    } else {
      list = null;
    }
    return list;
  },

  async getUserEvents(userid) {
    await db.read();
    return db.data.events.filter((event) => event.userid === userid);
  },

  async deleteEventById(id) {
    await db.read();
    const index = db.data.events.findIndex((event) => event._id === id);
    if (index !== -1) db.data.events.splice(index, 1);
    await db.write();
  },

  async deleteAllEvents() {
    db.data.events = [];
    await db.write();
  },
};