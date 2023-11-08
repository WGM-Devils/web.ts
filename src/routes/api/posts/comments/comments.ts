// Imports

import express, { Router } from "express";
import sendRouter from "./send";

// Presets

let commentsRouter = express.Router();

// Code

commentsRouter.use("/send", sendRouter);

// Exports

export default commentsRouter;
