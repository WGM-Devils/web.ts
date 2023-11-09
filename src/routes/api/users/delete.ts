// Imports

import fs from "fs-extra";
import express from "express";
import { response } from "../errors/errors";
import { Group, Post, User, UserComment, UserEvent } from "../apiTypes";
import url from "../../../server";

// Presets

let all = fs.readJsonSync("src/data/files/all.json");
let users: User[] = fs.readJsonSync("src/data/files/users.json").users;
let posts: Post[] = fs.readJsonSync("src/data/files/posts.json").posts;
let comments: UserComment[] = fs.readJsonSync(
  "src/data/files/comments.json"
).comments;
let groups: Group[] = fs.readJsonSync("src/data/files/groups.json").comments;
let events: UserEvent[] = fs.readJsonSync(
  "src/data/files/userEvents.json"
).events;
let deleteRouter = express.Router();

// Code

deleteRouter.delete("/?id=:id", (req, res) => {
  if (req.headers["authorization"] != undefined) {
    if (req.headers["authorization"] === process.env.KEY) {
      if (all[req.params.id] !== undefined) {
        delete all[req.params.id];
        let user = users.find((u) => u.id === req.params.id);
        user?.posts.collection.forEach(async (pid) => {
          await fetch(`${url}/api/posts/delete?id=${pid}`, {
            method: "DELETE",
            headers: {
              Authorization: "KlingtGut",
              "Content-Type": "application/json",
            },
          }).then((subres) => {
            if (subres.status === 200) {
              return subres.json();
            } else {
              return res.status(500).json(response(500));
            }
          });
        });
        fs.writeJsonSync("src/data/files/all.json", all, {
          spaces: 4,
        });

        fs.writeJsonSync("src/data/files/users.json", users, { spaces: 4 });
        fs.writeJsonSync("src/data/files/all.json", all, { spaces: 4 });
        fs.writeJsonSync("src/data/files/all.json", all, { spaces: 4 });
        fs.writeJsonSync("src/data/files/all.json", all, { spaces: 4 });
        return res.status(200).json(response(200));
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
