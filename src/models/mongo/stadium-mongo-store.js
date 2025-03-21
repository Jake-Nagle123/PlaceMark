import { Stadium } from "./stadium";

export const stadiumMongoStore = {
  async getStadiumsByEventId(id) {
    const stadiums = await Stadium.find({ eventid: id }).lean();
    return stadiums;
  },
};