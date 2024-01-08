import express from "express";

import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controller/users";

export default (router: express.Router) => {
  router.get("/users/all/type=:type", getAllUsers);
  router.get("/users/get/id=:id/type=:type", getUser);
  router.delete("/users/delete/id=:id", deleteUser);
  router.patch("/users/update/id=:id/type=:type", updateUser);
};
