// Imports

import express from "express";

// API-Imports

import membersRouter from "./members/members";
import createRouter from "./create";
import deleteRouter from "./delete";
import editRouter from "./edit";

// Presets

let groupsRouter = express.Router();

// Code

groupsRouter.use("/members", membersRouter);
groupsRouter.use("/create", createRouter);
groupsRouter.use("/delete", deleteRouter);
groupsRouter.use("/edit", editRouter);

// Exports

export default groupsRouter;
