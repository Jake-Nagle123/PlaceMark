import Mongoose from "mongoose";

const { Schema } = Mongoose;

const stadiumSchema = new Schema({
  stadium: String,
  competition: String,
  rating: Number,
  city: String,
  latitude: Number,
  longitude: Number,
  eventid: {
    type: Schema.Types.ObjectId,
    ref: "Event",
  },
  stadiumType: {
    type: String,
    enum: ["public", "private"],
    default: "private",
  },
});

export const Stadium = Mongoose.model("Stadium", stadiumSchema);