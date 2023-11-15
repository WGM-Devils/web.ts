// Imports

import express, { Router } from "express";

// API-Imports

import addRouter from "./add";
import removeRouter from "./remove";

// Presets

let likesRouter = express.Router();

// Code

likesRouter.use("/add", addRouter);
likesRouter.use("/remove", removeRouter);

// Exports

export default likesRouter;
