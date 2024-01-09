// Imports

import express from "express";

// Project-Imports

import { getById, updateById } from "../db/posts";
import {
  getCById,
  create,
  updateCById,
  deleteById,
  getAll,
  getAllByCreator,
  getAllByPostId,
} from "../db/comments";
import { getUserById, updateUserById } from "../db/users";
import { sendAPIResponse } from "../helpers/respond";
import validateAccess from "../helpers/validateAccess";

// Code

export const createComment = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    if (!validateAccess(req)) {
      return res
        .status(401)
        .json(sendAPIResponse(401, "Unauthorized.", null, null))
        .end();
    }

    const { postId } = req.params;
    const post = await getById(postId);
    if (!post) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "Post not found.", null, null))
        .end();
    }

    const { userId, content } = req.body;
    const user = await getUserById(userId);
    if (!user) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "User not found.", null, null))
        .end();
    }

    if (!post.comments.allowed) {
      return res
        .status(403)
        .json(sendAPIResponse(403, "Comments not allowed.", null, null))
        .end();
    }

    const comment = {
      creator: userId,
      content,
      postId,
    };
    const createdComment = await create(comment);
    const commentId = createdComment._id;

    post.comments.collection.push(commentId);
    post.comments.count++;
    await updateById(postId, post);

    user.comments.collection.push(commentId);
    user.posts.count++;
    await updateUserById(userId, user);

    return res
      .status(201)
      .json(sendAPIResponse(201, "Comment created.", null, null))
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(sendAPIResponse(500, "Our fault.", null, null))
      .end();
  }
};
export const deleteComment = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    if (!validateAccess(req)) {
      return res
        .status(401)
        .json(sendAPIResponse(401, "Unauthorized.", null, null))
        .end();
    }

    const { commentId, postId, userId } = req.params;

    const comment = await getCById(commentId);
    if (!comment) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "Comment not found.", null, null))
        .end();
    }

    const post = await getById(postId);
    if (!post) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "Post not found.", null, null))
        .end();
    }

    const user = await getUserById(userId);
    if (!user) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "User not found.", null, null))
        .end();
    }
    if (comment.creator !== userId) {
      return res
        .status(403)
        .json(sendAPIResponse(403, "Not allowed.", null, null))
        .end();
    }

    await deleteById(commentId);

    post.comments.count--;
    post.comments.collection = post.comments.collection.filter(
      (c) => c !== commentId
    );
    await updateById(postId, post);

    user.comments.count--;
    user.comments.collection = user.comments.collection.filter(
      (c) => c !== commentId
    );
    await updateUserById(userId, user);

    return res
      .status(204)
      .json(sendAPIResponse(204, "Comment deleted.", null, null))
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(sendAPIResponse(500, "Our fault.", null, null))
      .end();
  }
};
export const updateComment = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    if (!validateAccess(req)) {
      return res
        .status(401)
        .json(sendAPIResponse(401, "Unauthorized.", null, null))
        .end();
    }

    const { commentId, userId } = req.params;

    const comment = await getCById(commentId);
    if (!comment) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "Comment not found.", null, null))
        .end();
    }

    const user = await getUserById(userId);
    if (!user) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "User not found.", null, null))
        .end();
    }
    if (comment.creator !== userId) {
      return res
        .status(403)
        .json(sendAPIResponse(403, "Not allowed.", null, null))
        .end();
    }

    const { content } = req.body;
    comment.content = content;
    await updateCById(commentId, comment);

    return res
      .status(204)
      .json(sendAPIResponse(204, "Comment updated.", null, null))
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(sendAPIResponse(500, "Our fault.", null, null))
      .end();
  }
};
export const getComment = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { commentId, type } = req.params;

    const comment = await getCById(commentId);
    if (!comment) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "Comment not found.", null, null))
        .end();
    }

    if (type === "json") {
      return res
        .status(200)
        .json(sendAPIResponse(200, "Comment fetched.", comment, "json"))
        .end();
    } else {
      return res
        .status(200)
        .json(
          sendAPIResponse(
            200,
            "Comment fetched.",
            { comments: Object.values(comment) },
            null
          )
        )
        .end();
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(sendAPIResponse(500, "Our fault.", null, null))
      .end();
  }
};
export const getAllComments = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const comments = await getAll();
    if (!comments) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "Comments not found.", null, null))
        .end();
    }

    return res
      .status(200)
      .json(
        sendAPIResponse(200, "Comments fetched.", { comments: comments }, "arr")
      )
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(sendAPIResponse(500, "Our fault.", null, null))
      .end();
  }
};
export const getAllCommentsByCreator = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { userId } = req.params;

    const comments = await getAllByCreator(userId);
    if (!comments) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "Comments not found.", null, null))
        .end();
    }

    return res
      .status(200)
      .json(
        sendAPIResponse(200, "Comments fetched.", { comments: comments }, "arr")
      )
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(sendAPIResponse(500, "Our fault.", null, null))
      .end();
  }
};
export const getAllCommentsByPostId = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { postId } = req.params;

    const comments = await getAllByPostId(postId);
    if (!comments) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "Comments not found.", null, null))
        .end();
    }

    return res
      .status(200)
      .json(
        sendAPIResponse(200, "Comments fetched.", { comments: comments }, "arr")
      )
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(sendAPIResponse(500, "Our fault.", null, null))
      .end();
  }
};
export const likeComment = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    if (!validateAccess(req)) {
      return res
        .status(401)
        .json(sendAPIResponse(401, "Unauthorized.", null, null))
        .end();
    }

    const { commentId, userId } = req.params;

    const comment = await getCById(commentId);
    if (!comment) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "Comment not found.", null, null))
        .end();
    }

    const user = await getUserById(userId);
    if (!user) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "User not found.", null, null))
        .end();
    }

    comment.likes.count++;
    comment.likes.collection.push(userId);
    await updateCById(commentId, comment);

    user.likes.count++;
    user.likes.collection.push({ id: commentId, type: "comment" });
    await updateUserById(userId, user);

    return res
      .status(204)
      .json(sendAPIResponse(204, "Comment liked.", null, null))
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(sendAPIResponse(500, "Our fault.", null, null))
      .end();
  }
};
export const unlikeComment = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    if (!validateAccess(req)) {
      return res
        .status(401)
        .json(sendAPIResponse(401, "Unauthorized.", null, null))
        .end();
    }

    const { commentId, userId } = req.params;

    const comment = await getCById(commentId);
    if (!comment) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "Comment not found.", null, null))
        .end();
    }

    const user = await getUserById(userId);
    if (!user) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "User not found.", null, null))
        .end();
    }

    comment.likes.count--;
    comment.likes.collection = comment.likes.collection.filter(
      (c) => c !== userId
    );
    await updateCById(commentId, comment);

    user.likes.count--;
    user.likes.collection = user.likes.collection.filter(
      (c) => c.id !== commentId && c.type === "comment"
    );
    await updateUserById(userId, user);

    return res
      .status(204)
      .json(sendAPIResponse(204, "Comment unliked.", null, null))
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(sendAPIResponse(500, "Our fault.", null, null))
      .end();
  }
};
