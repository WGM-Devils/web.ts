import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  auth: {
    salt: { type: String, required: true, select: false },
    password: { type: String, required: true, select: false },
    sessionToken: { type: String, required: false, select: false },
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
    count: { type: Number, required: true },
    collection: { type: Array, required: true },
  },
  comments: {
    count: { type: Number, required: true },
    collection: { type: Array, required: true },
  },
  posts: {
    count: { type: Number, required: true },
    collection: { type: Array, required: true },
  },
  views: {
    count: { type: Number, required: true },
    collection: { type: Array, required: true },
  },
  events: { type: Array, required: true },
  groups: { type: Array, required: true },
  createdAt: { type: Date, required: true },
});

export const UserModel = mongoose.model("User", UserSchema, "");

export const getUserById = (id: string) => UserModel.findById(id);
export const getAllUsers = () => UserModel.find();
export const deleteUser = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());
