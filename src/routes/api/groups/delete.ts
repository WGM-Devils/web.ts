// Imports

import express from "express";
import fs from "fs-extra";

// Presets

let deleteRouter = express.Router();

// Code

deleteRouter.delete("/", (req, res) => {});

// Exports

export default deleteRouter;
