// Imports

import mongoose from "mongoose";

// Code

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  auth: {
    salt: { type: String, required: true, select: false },
    password: { type: String, required: true, select: false },
  },
  username: { type: String, required: true },
  description: { type: String, required: false },
  pfp: {
    extension: { type: String, required: false },
    path: { type: String, required: false },
  },
  banner: {
    extension: { type: String, required: false },
    link: { type: String, required: false },
  },
  likes: {
    count: { type: Number, default: 0 },
    collection: { type: Array, default: [] },
  },
  comments: {
    count: { type: Number, default: 0 },
    collection: { type: Array, default: [] },
  },
  posts: {
    count: { type: Number, default: 0 },
    collection: { type: Array, default: [] },
  },
  views: {
    count: { type: Number, default: 0 },
    collection: { type: Array, default: 0 },
  },
  events: { type: Array, default: [] },
  groups: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now() },
});

// Exports

export const UserModel = mongoose.model("User", UserSchema, "users");

export const getUsers = () => UserModel.find();

export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ "authentication.sessionToken": sessionToken });
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);
