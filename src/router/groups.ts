// Imports

import express from "express";

// Project-Imports

import {
  createGroup,
  deleteGroup,
  getGroup,
  getGroupByCreator,
  joinGroup,
  leaveGroup,
  updateGroup,
} from "../controller/groups";

// Exports

export default (router: express.Router) => {
  router.post("/groups/create/type=:type", createGroup);
  router.get("/groups/get/id=:id/type=:type", getGroup);
  router.get("/groups/all", getGroup);
  router.get("/groups/get/creator=:creator", getGroupByCreator);
  router.delete("/groups/delete/id=:id", deleteGroup);
  router.patch("/groups/update/id=:id/type=:type", updateGroup);
  router.post("/groups/join/id=:id/user=:userId", joinGroup);
  router.post("/groups/leave/id=:id/user=:userId", leaveGroup);
};
