// Imports

import Express from "express";

// API Imports

import testing from "./testing";
import usersRouter from "./users/users";
import groupsRouter from "./groups/groups";
// Presets

let apiRouter = Express.Router();

// Code

apiRouter.use("/groups", groupsRouter);
apiRouter.use("/testing", testing);
apiRouter.use("/users", usersRouter);

// Exports

export default apiRouter;
