// Imports

import mongoose from "mongoose";

// Code

const PostSchema = new mongoose.Schema({
  user: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  embed: {
    type: { type: String, required: false },
    link: { type: String, required: false },
  },
  comments: {
    allowed: { type: Boolean, default: true },
    count: { type: Number, default: 0 },
    collection: { type: Array, default: [] },
  },
  likes: {
    count: { type: Number, default: 0 },
    collection: { type: Array, default: [] },
  },
  views: {
    count: { type: Number, default: 0 },
    collection: { type: Array, default: [] },
  },
  createdAt: { type: Date, default: Date.now() },
  lastUpdated: { type: Date, default: Date.now() },
});

const PostModel = mongoose.model("Post", PostSchema, "posts");

// Exports

export const getAll = () => PostModel.find();

export const getById = (id: string) => PostModel.findById(id);
export const create = (values: Record<string, any>) =>
  new PostModel(values).save().then((post) => post.toObject());
export const deleteById = (id: string) =>
  PostModel.findOneAndDelete({ _id: id });
export const updateById = (id: string, values: Record<string, any>) =>
  PostModel.findByIdAndUpdate(id, values);
