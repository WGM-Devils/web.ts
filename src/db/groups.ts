// Imports

import mongoose from "mongoose";

// Code

const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  creator: { type: String, required: true },
  description: { type: String, required: true },
  members: { type: Array, default: [] },
  slogan: { type: String, required: false },
  city: {
    latitude: { type: String, required: false },
    longitude: { type: String, required: false },
  },
});

// Exports

export const GroupModel = mongoose.model("Group", GroupSchema, "groups");

export const getAll = async () => GroupModel.find();
export const getById = async (id: string) => GroupModel.findById(id);
export const getByCreator = async (creator: string) =>
  GroupModel.find({ creator: creator });
export const deleteById = async (id: string) =>
  GroupModel.findByIdAndDelete(id);
export const updateById = async (id: string, values: Record<string, any>) =>
  GroupModel.findByIdAndUpdate(id, values);
export const create = async (values: Record<string, any>) =>
  GroupModel.create(values);
