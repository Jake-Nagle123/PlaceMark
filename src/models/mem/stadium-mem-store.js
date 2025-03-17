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
    return stadiums.find((stadium) => stadium._id === id);
  },

  async getEventStadiums(eventId) {
    return stadiums.filter((stadium) => stadium.eventid === eventId);
  },

  async deleteStadium(id) {
    const index = stadiums.findIndex((stadium) => stadium._id === id);
    stadiums.splice(index, 1);
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