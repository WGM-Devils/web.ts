import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  user: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  embed: {
    type: { type: String, required: false },
    link: { type: String, required: false },
  },
  comments: {
    allowed: { type: Boolean, required: true },
    count: { type: Number, required: true },
    collection: { type: Array, required: true },
  },
  likes: {
    count: { type: Number, required: true },
    collection: { type: Array, required: true },
  },
  views: {
    count: { type: Number, required: true },
    collection: { type: Array, required: true },
  },
  createdAt: { type: Date, required: true },
  lastUpdated: { type: Date, required: true },
});
