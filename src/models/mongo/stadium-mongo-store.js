import Mongoose from "mongoose";
import { Stadium } from "./stadium.js";

export const stadiumMongoStore = {
  async getAllStadiums() {
    const stadiums = await Stadium.find().lean();
    return stadiums;
  },

  async addStadium(eventId, stadium) {
    stadium.eventid = eventId;
    const newStadium = new Stadium(stadium);
    const stadiumObj = await newStadium.save();
    return this.getStadiumById(stadiumObj._id);
  },

  async getStadiumsByEventId(id) {
    const stadiums = await Stadium.find({ eventid: id }).lean();
    return stadiums;
  },

  async getStadiumById(id) {
    if (Mongoose.isValidObjectId(id)) {
      const stadium = await Stadium.findOne({ _id: id }).lean();
      return stadium;
    }
    return null;
  },

  async deleteStadium(id) {
    try {
      await Stadium.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllStadiums() {
    await Stadium.deleteMany({});
  },

  async updateStadium(stadium, updatedStadium) {
    const stadiumDoc = await Stadium.findOne({ _id: stadium._id });
    stadiumDoc.stadium = updatedStadium.stadium;
    stadiumDoc.competition = updatedStadium.competition;
    stadiumDoc.rating = updatedStadium.rating;
    stadiumDoc.city = updatedStadium.city;
    stadiumDoc.latitude = updatedStadium.latitude;
    stadiumDoc.longitude = updatedStadium.longitude;
    await stadiumDoc.save();
  },
};