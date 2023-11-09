// Imports

import express from "express";
import fs from "fs-extra";
import { response } from "../errors/errors";
import randomString from "random-string";
import { Group, Id, User, isGroup } from "../apiTypes";

// Presets

let createRouter = express.Router();
let all = fs.readJsonSync("src/data/files/all.json");
let users: User[] = fs.readJsonSync("src/data/files/users.json").users;
let groups: Group[] = fs.readJsonSync("src/data/files/groups.json").groups;

// Code

createRouter.post("/", (req, res) => {
  if (req.headers["authorization"] !== undefined) {
    if (req.headers["authorization"] === process.env.KEY) {
      let newGroup = req.body;
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
      newGroup.id = id;
      if (isGroup(newGroup)) {
        all[id] = "group";
        let user = users.find((u) => u.id === newGroup.creator);
        user?.groups.push(id);
        groups.push(newGroup);
        fs.writeJsonSync(
          "src/data/files/groups.json",
          { groups: groups },
          { spaces: 4 }
        );
        users.splice(
          users.indexOf(<User>users.find((u) => u.id === newGroup.creaor))
        );
        users.push(<User>user);
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
