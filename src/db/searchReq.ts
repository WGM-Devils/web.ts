// Imports

import mongoose from "mongoose";

// Code

const SearchReqSchema = new mongoose.Schema({
  creator: {
    type: String,
    required: true,
  },
  search: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    picture: { type: String, required: true },
  },
  createdAt: { type: Date, default: Date.now() },
});

// Exports

export const SearchReqModel = mongoose.model(
  "SearchReq",
  SearchReqSchema,
  "searchReqs"
);

export const getAll = async () => SearchReqModel.find();
export const getAllByCreator = async (creator: string) =>
  SearchReqModel.find({ creator });
export const create = async (values: Record<string, any>) =>
  SearchReqModel.create(values);
export const deleteById = async (id: string) =>
  SearchReqModel.findByIdAndDelete(id);
export const updateById = async (id: string, values: Record<string, any>) =>
  SearchReqModel.findByIdAndUpdate(id, values);
export const getById = async (id: string) => SearchReqModel.findById(id);
