// Imports

import fs from "fs-extra";
import express from "express";
import { response } from "../errors/errors";
import randomString from "random-string";
import { Id, Post, isPost } from "../apiTypes";

// Presets

let all = fs.readJsonSync("src/data/files/all.json");
let posts: Post[] = fs.readJsonSync("src/data/files/posts.json").posts;
let createRouter = express.Router();

// Code

createRouter.post("/", (req, res) => {
  if (req.headers["authorization"] !== "") {
    if (req.headers["authorization"] === process.env.KEY) {
      let newPost = req.body;
      let id: Id = randomString({
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
      newPost.id = id;
      if (isPost(newPost)) {
        try {
          all[id] = "post";
          posts.push(newPost);
          fs.writeJsonSync(
            "src/data/files/posts.json",
            { posts: posts },
            { spaces: 4 }
          );
          fs.writeJsonSync("src/data/files/all.json", all, { spaces: 4 });
          res.status(200).json(newPost);
        } catch (error) {
          console.log(error);
          res.status(500).json(response(500));
        }
      } else {
        return res.status(409).json(response(409));
      }
    } else {
      return res.status(401).json(response(401));
    }
  } else {
    return res.status(400).json(response(400));
  }
});

// Exports

export default createRouter;
