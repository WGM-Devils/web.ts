// Imports

import express, { Router } from "express";

// API-Imports

import kickRouter from "./kick";
import addRouter from "./add";

// Presets

let membersRouter = express.Router();

// Code

membersRouter.use("/kick", kickRouter);
membersRouter.use("/add", addRouter);

// Exports

export default membersRouter;
