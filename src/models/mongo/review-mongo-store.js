import Mongoose from "mongoose";
import { Review } from "./review.js";

export const reviewMongoStore = {
  async getAllReviews() {
    const reviews = await Review.find().lean();
    return reviews;
  },

  async addReview(eventId, review) {
    review.eventid = eventId;
    const newReview = new Review(review);
    const reviewObj = await newReview.save();
    return this.getReviewById(reviewObj._id);
  },

  async getReviewById(id) {
    if (Mongoose.isValidObjectId(id)) {
      const review = await Review.findOne({ _id: id }).lean();
      return review;
    }
    return null;
  },

  async getReviewsByEventId(id) {
    const reviews = await Review.find({ eventid: id }).lean();
    return reviews;
  },

    async deleteAllReviews() {
      await Review.deleteMany({});
    },
};