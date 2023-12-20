// Imports

import express from "express";
import fs from "fs-extra";
import { response } from "../errors/errors";
import { Post, User, UserComment } from "../apiTypes";

// Presets

let deleteRouter = express.Router();
let all = fs.readJsonSync("src/data/files/all.json");
let posts: Post[] = fs.readJsonSync("src/data/files/posts.json").posts;
let users: User[] = fs.readJsonSync("src/data/files/users.json").users;
let comments: UserComment[] = fs.readJsonSync(
  "src/data/files/comments.json"
).comments;

// Code

deleteRouter.delete("/postId=:post", (req, res) => {
  if (req.headers["authorization"] != undefined) {
    if (req.headers["authorization"] === process.env.KEY) {
      if (all[req.params.post]) {
      } else {
        return res.status(404).json(response(404));
      }
    } else {
      return res.status(401).json(response(401));
    }
  } else {
    return res.status(400).json(response(400));
  }
});

// Exports

export default deleteRouter;
