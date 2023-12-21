import express from "express";
import { get } from "lodash";

import { getPostById } from "db/posts";

export const isCreator = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { postId } = req.params;
    const post = await getPostById(postId);
    const user = post.user;

    const currentUserId = get(req, "identify._id") as string;

    if (!currentUserId) {
      return res.sendStatus(403);
    }

    if (currentUserId.toString() !== user) {
      return res.sendStatus(403);
    }
    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
