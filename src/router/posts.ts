// Imports

import express from "express";

// Project-Imports

import {
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
} from "../controller/posts";

// Exports

export default (router: express.Router) => {
  router.get("/posts/all", getAllPosts);
  router.get("/posts/get/id=:id/type=:type", getPost);
  router.delete("/posts/delete/postId=:postId", deletePost);
  router.patch("/posts/update/id=:id/type=:type", updatePost);
};
