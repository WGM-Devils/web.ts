// Imports

import fs from "fs-extra";
import express from "express";
import { response } from "../errors/errors";

// Presets

let allRouter = express.Router();

// Code

allRouter.get("/", (req, res) => {
  if (req.headers["authorization"] !== "") {
    if (req.headers["authorization"] === process.env.KEY) {
      let posts = fs.readJsonSync("src/data/files/posts.json").posts;
      return res.status(200).json({ posts: posts });
    } else {
      return res.status(401).json(response(401));
    }
  } else {
    return res.status(400).json(response(400));
  }
});

// Exports

export default allRouter;
