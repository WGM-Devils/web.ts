// Imports

import express from "express";

// Presets

let userRouter = express.Router();

// API Imports

import allRouter from "./all";
import createRouter from "./create";

// Code

userRouter.use("/all", allRouter);
userRouter.use("/create", createRouter);

// Exports

export default userRouter;
