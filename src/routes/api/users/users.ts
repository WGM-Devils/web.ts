// Imports

import express from "express";

// Presets

let userRouter = express.Router();

// API Imports

import allRouter from "./all";

// Code

userRouter.use("/all", allRouter);

// Exports

export default userRouter;
