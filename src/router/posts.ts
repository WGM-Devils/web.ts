import express from "express";

import {
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
} from "../controller/posts";

export default (router: express.Router) => {
  router.get("/posts/all/type=:type", getAllPosts);
  router.get("/posts/get/id=:id/type=:type", getPost);
  router.delete("/posts/delete/postId=:postId", deletePost);
  router.patch("/posts/update/id=:id/type=:type", updatePost);
};
