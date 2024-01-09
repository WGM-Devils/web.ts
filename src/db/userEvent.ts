// Imports

import mongoose from "mongoose";

// Code

const UserEventSchema = new mongoose.Schema({
  creator: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  logo: {
    type: { type: String, required: true },
    link: { type: String, required: true },
  },
  website: { type: String, required: false },
  date: { type: Date, required: true },
  city: {
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
  },
  createdAt: { type: Date, default: Date.now() },
});

// Exports

export const UserEventModel = mongoose.model(
  "UserEvent",
  UserEventSchema,
  "UserEvents"
);

export const getAll = () => UserEventModel.find();
export const getById = (id: string) => UserEventModel.findById(id);
export const create = (values: Record<string, any>) =>
  UserEventModel.create(values);
export const getAllByCreator = (creator: string) =>
  UserEventModel.find({ creator });
export const updateById = (id: string, values: Record<string, any>) =>
  UserEventModel.findByIdAndUpdate(id, values);
export const deleteById = (id: string) => UserEventModel.findByIdAndDelete(id);
