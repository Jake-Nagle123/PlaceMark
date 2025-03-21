import Mongoose from "mongoose";

const { Schema } = Mongoose;

const eventSchema = new Schema({
  title: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Event = Mongoose.model("Event", eventSchema);