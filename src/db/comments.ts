// Imports

import mongoose from "mongoose";

// Code

const CommentSchema = new mongoose.Schema({
  creator: { type: String, required: true },
  postId: { type: String, required: true },
  content: { type: String, required: true },
  likes: {
    count: { type: Number, default: 0 },
    collection: { type: [String], default: [] },
  },
  createdAt: { type: Date, default: Date.now() },
});

// Exports

export const CommentModel = mongoose.model(
  "Comment",
  CommentSchema,
  "Comments"
);
export const getAll = () => CommentModel.find();
export const getCById = (id: string) => CommentModel.findById(id);
export const getAllByPostId = (postId: string) => CommentModel.find({ postId });
export const create = (values: Record<string, any>) =>
  CommentModel.create(values);
export const getAllByCreator = (creator: string) =>
  CommentModel.find({ creator });
export const updateCById = (id: string, values: Record<string, any>) =>
  CommentModel.findByIdAndUpdate(id, values);
export const deleteById = (id: string) => CommentModel.findByIdAndDelete(id);
