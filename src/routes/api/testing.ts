// Imports

import { response } from "./errors/errors";
import express from "express";

// Presets

let testRouter = express.Router();

// Code

testRouter.get("?code=:code", (req, res) => {
  if (req.params.code === "200") {
    return res.status(200).json(response(200));
  } else if (req.params.code === "201") {
    return res.status(200).json(response(201));
  } else if (req.params.code === "204") {
    return res.status(200).json(response(204));
  } else if (req.params.code === "400") {
    return res.status(200).json(response(400));
  } else if (req.params.code === "401") {
    return res.status(200).json(response(401));
  } else if (req.params.code === "404") {
    return res.status(200).json(response(404));
  } else if (req.params.code === "409") {
    return res.status(200).json(response(409));
  } else if (req.params.code === "500") {
    return res.status(200).json(response(500));
  }
});

// Exports

export default testRouter;
