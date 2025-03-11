import { v4 } from "uuid";

let stadiums = [];

export const stadiumMemStore = {
  async getAllStadiums() {
    return stadiums;
  },

  async addStadium(stadium) {
    stadium._id = v4();
    stadiums.push(stadium);
    return stadium;
  },

  async getStadiumById(id) {
    return stadiums.find((stadium) => stadium._id === id);
  },

  async deleteStadiumById(id) {
    const index = playlists.findIndex((stadium) => stadium._id === id);
    stadiums.splice(index, 1);
  },

  async deleteAllStadiums() {
    stadiums = [];
  },
};