// Imports

import fs from "fs-extra";
import express from "express";
import { response } from "../errors/errors";
import randomString from "random-string";
import { Id, User, isUser } from "../apiTypes";

// Presets

let all = fs.readJsonSync("src/data/files/all.json");
let users: User[] = fs.readJsonSync("src/data/files/users.json").users;
let createRouter = express.Router();

// Code

createRouter.post("/", (req, res) => {
  if (req.headers["authorization"] !== "") {
    if (req.headers["authorization"] === process.env.KEY) {
      let newUser = req.body;
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
      newUser.id = id;
      if (isUser(newUser)) {
        try {
          all[id] = "user";
          users.push(newUser);
          res.status(200).json(newUser);
        } catch (error) {
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
