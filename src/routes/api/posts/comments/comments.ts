// Imports

import express, { Router } from "express";

// API-Imports

import sendRouter from "./send";
import editRouter from "./enable";
import deleteRouter from "./delete";
import disableRouter from "./disable";
import enableRouter from "./enable";

// Presets

let commentsRouter = express.Router();

// Code

commentsRouter.use("/send", sendRouter);
commentsRouter.use("/edit", editRouter);
commentsRouter.use("/delete", deleteRouter);
commentsRouter.use("/disable", disableRouter);
commentsRouter.use("/enable", enableRouter);

// Exports

export default commentsRouter;
