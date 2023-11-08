// Imports

import Express from "express";
import comments from "./posts/comments/comments";
import testing from "./testing";

// Presets

let apiRouter = Express.Router();

// Code

apiRouter.use("/comments", comments);
apiRouter.use("/testing", testing);

// Exports

export default apiRouter;
