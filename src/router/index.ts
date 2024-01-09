// Imports

import express from "express";

// Project-Imports

import auth from "./auth";
import users from "./users";
import groups from "./groups";
import posts from "./posts";
import userEvents from "./userEvents";

// Constants

const router = express.Router();

// Exports

export default (): express.Router => {
  users(router);
  auth(router);
  posts(router);
  groups(router);
  userEvents(router);
  return router;
};
