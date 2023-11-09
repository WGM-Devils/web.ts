// Imports

import fs from "fs-extra";
import { Router } from "express";
import { response } from "../errors/errors";
import randomString from "random-string";
import { Id, User, isUser } from "../apiTypes";

// Presets

let users: User[] = fs.readJsonSync("data/files/users.json").users;

// Code

export default async function (router: Router) {
  router.get("?id=:id", (req, res) => {
    if (req.headers["authorization"] !== "") {
      if (req.headers["authorization"] === process.env.KEY) {
      } else {
        return res.status(401).json(response(401));
      }
    } else {
      return res.status(400).json(response(400));
    }
  });
}
