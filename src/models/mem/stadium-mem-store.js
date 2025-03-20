import { v4 } from "uuid";

let stadiums = [];

export const stadiumMemStore = {
  async getAllStadiums() {
    return stadiums;
  },

  async addStadium(eventId, stadium) {
    stadium._id = v4();
    stadium.eventid = eventId;
    stadiums.push(stadium);
    return stadium;
  },

  async getStadiumsByEventId(id) {
    return stadiums.filter((stadium) => stadium.eventid === id);
  },

  async getStadiumById(id) {
    let foundStadium = stadiums.find((stadium) => stadium._id === id);
    if (!foundStadium) {
      foundStadium = null;
    }
    return foundStadium;
  },

  async getEventStadiums(eventId) {
    let foundStadiums = stadiums.filter((stadium) => stadium.eventid === eventId);
    if (!foundStadiums) {
      foundStadiums = null;
    }
    return foundStadiums;
  },

  async deleteStadium(id) {
    const index = stadiums.findIndex((stadium) => stadium._id === id);
    if (index !== -1) stadiums.splice(index, 1);
  },

  async deleteAllStadiums() {
    stadiums = [];
  },

  async updateStadium(stadium, updatedStadium) {
    stadium.title = updatedStadium.title;
    stadium.competition = updatedStadium.competition;
    stadium.rating = updatedStadium.rating;
  },
};