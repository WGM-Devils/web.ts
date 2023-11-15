// Imports

import express from "express";

// Presets

let userEventsRouter = express.Router();

// API-Imports

import editRouter from "./edit";
import createRouter from "./create";
import deleteRouter from "./delete";
import allRouter from "./all";

// Code

userEventsRouter.use("/edit", editRouter);
userEventsRouter.use("/create", createRouter);
userEventsRouter.use("/delete", deleteRouter);
userEventsRouter.use("/all", allRouter);

// Exports

export default userEventsRouter;
