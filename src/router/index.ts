// Imports

import express from "express";

// Project-Imports

import auth from "./auth";
import users from "./users";

// Constants

const router = express.Router();

// Exports

export default (): express.Router => {
  users(router);
  auth(router);
  return router;
};
