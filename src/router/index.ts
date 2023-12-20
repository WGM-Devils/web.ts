// Imports

import express from "express";

// Project-Imports

import auth from "./auth";
import users from "./users";

// Constants

const router = express.Router();

// Routes

export default (): express.Router => {
  users(router);
  auth(router);
  return router;
};
