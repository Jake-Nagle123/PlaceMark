import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const stadiumJsonStore = {
  async getAllStadiums() {
    await db.read();
    return db.data.stadiums;
  },

  async addStadium(eventId, stadium) {
    await db.read();
    stadium._id = v4();
    stadium.eventid = eventId;
    db.data.stadiums.push(stadium);
    await db.write();
    return stadium;
  },

  async getStadiumsByEventId(id) {
    await db.read();
    let foundStadiums = db.data.stadiums.filter((stadium) => stadium.eventid === id);
    if (!foundStadiums) {
      foundStadiums = null;
    }
    return foundStadiums;
  },

  async getStadiumById(id) {
    await db.read();
    let foundStadium = db.data.stadiums.find((stadium) => stadium._id === id);
    if (!foundStadium) {
      foundStadium = null;
    }
    return foundStadium;
  },

  async getEventStadiums(eventId) {
    await db.read();
    let foundStadiums = stadiums.filter((stadium) => stadium.eventid === eventId);
    if (!foundStadiums) {
      foundStadiums = null;
    }
    return foundStadiums;
  },

  async deleteStadium(id) {
    await db.read();
    const index = db.data.stadiums.findIndex((stadium) => stadium._id === id);
    if (index !== -1) db.data.stadiums.splice(index, 1);
    await db.write();
  },

  async deleteAllStadiums() {
    db.data.stadiums = [];
    await db.write();
  },

  async updateStadium(stadium, updatedStadium) {
    stadium.title = updatedStadium.title;
    stadium.competition = updatedStadium.competition;
    stadium.rating = updatedStadium.rating;
    stadium.city = updatedStadium.city;
    stadium.latitude = updatedStadium.latitude;
    stadium.longitude = updatedStadium.longitude;
    await db.write();
  },
};