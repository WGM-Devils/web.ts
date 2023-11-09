// Imports

import express from "express";

// Presets

let usersRouter = express.Router();

// API Imports

import allRouter from "./all";
import createRouter from "./create";

// Code

usersRouter.use("/all", allRouter);
usersRouter.use("/create", createRouter);

// Exports

export default usersRouter;
