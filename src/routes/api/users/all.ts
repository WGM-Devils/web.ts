// Imports

import fs from "fs-extra";
import { Router } from "express";
import response from "../errors/errors";

// Presets

// Code

export default async function (router: Router) {
  router.get("/", (req, res) => {
    if (req.headers["authorization"] !== "") {
      if (req.headers["authorization"] === process.env.KEY) {
        let all = fs.readJsonSync("data/users.json").users;
        res.status(200).json(all);
      } else {
        res.status(401).json(response(401));
      }
    } else {
      res.status(400).json(response(400));
    }
  });
}
