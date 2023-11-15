// Imports

import express from "express";
import fs from "fs-extra";
import { response } from "../errors/errors";

// Presets

let deleteRouter = express.Router();

// Code

deleteRouter.delete("/?groupdId=:id", (req, res) => {
  if (req.headers["authorization"] != undefined) {
    if (req.headers["authorization"] === process.env.KEY) {
    } else {
      return res.status(401).json(response(401));
    }
  } else {
    return res.status(400).json(response(400));
  }
});

// Exports

export default deleteRouter;
