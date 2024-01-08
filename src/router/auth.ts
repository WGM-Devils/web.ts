// Imports

import express from "express";

// Project-Imports

import { login, register } from "../controller/auth";

// Exports

export default (router: express.Router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
};
