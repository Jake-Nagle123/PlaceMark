import Mongoose from "mongoose";

const { Schema } = Mongoose;

const eventSchema = new Schema({
  title: String,
  img: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  eventType: {
    type: String,
    enum: ["public", "private"],
    default: "private",
  },
});

export const Event = Mongoose.model("Event", eventSchema);