import express from "express";

import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controller/users";
import { isAuthenticated, isOwner } from "../middlewares";

export default (router: express.Router) => {
  router.get("/users/all/type=:type", getAllUsers);
  router.get("/users/get/id=:id/type=:type", isAuthenticated, getUser);
  router.delete(
    "/users/delete/id=:id/type=:type",
    isAuthenticated,
    isOwner,
    deleteUser
  );
  router.patch(
    "/users/update/id=:id/type=:type",
    isAuthenticated,
    isOwner,
    updateUser
  );
};
