// Imports

import express from "express";

// Presets

let postsRouter = express.Router();

// API-Imports

import editRouter from "./edit";
import createRouter from "./create";
import deleteRouter from "./delete";
import allRouter from "./all";
import commentsRouter from "./comments/comments";
import viewedRouter from "./views/viewed";
import likesRouter from "./likes/likes";

// Code

postsRouter.use("/edit", editRouter);
postsRouter.use("/create", createRouter);
postsRouter.use("/delete", deleteRouter);
postsRouter.use("/all", allRouter);
postsRouter.use("/comments", commentsRouter);
postsRouter.use("/views", viewedRouter);
postsRouter.use("/likes", likesRouter);

// Exports

export default postsRouter;
