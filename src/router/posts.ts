import express from "express";

import {
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
} from "../controller/posts";
import { isAuthenticated } from "../middlewares/users";
import { isCreator } from "../middlewares/posts";

export default (router: express.Router) => {
  router.get("/posts/all/type=:type", getAllPosts);
  router.get("/posts/get/id=:id/type=:type", isAuthenticated, getPost);
  router.delete(
    "/posts/delete/postId=:postId/type=:type",
    isAuthenticated,
    isCreator,
    deletePost
  );
  router.patch(
    "/posts/update/id=:id/type=:type",
    isAuthenticated,
    isCreator,
    updatePost
  );
};
