import Mongoose from "mongoose";

const { Schema } = Mongoose;

const reviewSchema = new Schema({
  reviewText: string,
  eventid: {
    type: Schema.Types.ObjectId,
    ref: "Event",
  },
  createdAt: { type: Date, default: Date.now }
});

export const Review = Mongoose.model("Review", reviewSchema); 