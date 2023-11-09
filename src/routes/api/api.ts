// Imports

import Express from "express";
import comments from "./posts/comments/comments";
import testing from "./testing";
import users from "./users/users";

// Presets

let apiRouter = Express.Router();

// Code

apiRouter.use("/comments", comments);
apiRouter.use("/testing", testing);
apiRouter.use("/users", users);

// Exports

export default apiRouter;
