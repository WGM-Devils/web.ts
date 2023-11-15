// Imports

import Express from "express";

// API Imports

import testing from "./testing";
import usersRouter from "./users/users";
import groupsRouter from "./groups/groups";
import userEventsRouter from "./userEvents/userEvents";

// Presets

let apiRouter = Express.Router();

// Code

apiRouter.use("/groups", groupsRouter);
apiRouter.use("/testing", testing);
apiRouter.use("/users", usersRouter);
apiRouter.use("/events", userEventsRouter);

// Exports

export default apiRouter;
