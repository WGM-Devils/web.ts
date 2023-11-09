// Imports

import express from "express";
import { response } from "../../errors/errors";
import fs from "fs-extra";
import randomString from "random-string";
import { Post, UserComment, isUserComment } from "../../apiTypes";
import { User } from "../../apiTypes";

// Presets

let sendRouter = express.Router();

// Code

sendRouter.post("/", (req, res) => {
  if (req.headers["authorization"] !== "") {
    if (req.headers["authorization"] === process.env.KEY) {
      let all = fs.readJsonSync("data/files/all.json");
      let posts: Post[] = fs.readJsonSync("data/files/posts.json").posts;
      let users: User[] = fs.readJsonSync("data/files/users.json").users;
      let comments = fs.readJsonSync("data/files/comments.json").comments;
      let id = randomString({
        length: 30,
        numeric: true,
        letters: false,
        special: false,
      });
      while (all[id] != undefined) {
        id = randomString({
          length: 30,
          numeric: true,
          letters: false,
          special: false,
        });
      }
      let comment = req.body;
      comment.id = id;
      if (isUserComment(comment)) {
        let post = <Post>(
          posts.find((p) => p.id === (<UserComment>comment).post)
        );
        if (!post.comments.allowed) {
          return res.status(401);
        }
        post.comments.collection.push(id);
        post.comments.count++;
        let user = <User>(
          users.find((u) => u.id === (<UserComment>comment).creator)
        );
        users.splice(users.indexOf(user));
        user.comments.collection.push(id);
        user.comments.count++;
      }
      return res.status(200).json({ comments: [comment] });
    } else {
      return res.status(401).json(response(401));
    }
  } else {
    return res.status(400).json(response(400));
  }
});

// Exports

export default sendRouter;
