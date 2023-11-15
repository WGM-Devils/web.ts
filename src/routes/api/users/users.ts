// Imports

import express from "express";

// Presets

let usersRouter = express.Router();

// API-Imports

import allRouter from "./all";
import createRouter from "./create";
import deleteRouter from "./delete";
import resetRouter from "./reset";
import editRouter from "./edit";
import getRouter from "./get";

// Code

usersRouter.use("/all", allRouter);
usersRouter.use("/create", createRouter);
usersRouter.use("/delete", deleteRouter);
usersRouter.use("/reset", resetRouter);
usersRouter.use("/edit", editRouter);
usersRouter.use("/get", getRouter);

// Exports

export default usersRouter;
