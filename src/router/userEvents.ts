// Imports

import express from "express";

// Project-Imports

import {
  getAllUserEvents,
  getAllUserEventsByCreator,
  getUserEvent,
  deleteUserEvent,
  updateUserEvent,
  createUserEvent,
} from "../controller/userEvent";

// Code + Exports

export default (router: express.Router) => {
  router.get("/userEvents/all", getAllUserEvents);
  router.get("/userEvents/all/creator=:creator", getAllUserEventsByCreator);
  router.get("/userEvents/get/id=:id/type=:type", getUserEvent);
  router.delete("/userEvents/delete/id=:id", deleteUserEvent);
  router.patch("/userEvents/update/id=:id/type=:type", updateUserEvent);
  router.post("/userEvents/create", createUserEvent);
};
