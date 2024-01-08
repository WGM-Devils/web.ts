import express from "express";

import { deleteById, updateById, getById, getAll, create } from "../db/posts";
import { sendAPIResponse } from "helpers/respond";

export const getAllPosts = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { type } = req.params;
    const posts = await getAll();

    if (type === "json") {
      return res
        .status(200)
        .json(
          sendAPIResponse(
            200,
            "Enjoy the contents you requested",
            posts,
            "json"
          )
        )
        .end();
    } else {
      return res
        .status(200)
        .json(
          sendAPIResponse(
            200,
            "Enjoy the contents you requested",
            {
              posts: Object.values(posts),
            },
            "arr"
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

export const createPost = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { title, content, embed, user } = req.body;

    if (!user) {
      return res
        .status(400)
        .json(sendAPIResponse(400, "You need a user!", null, null))
        .end();
    }

    if (!title || !content || !embed) {
      return res
        .status(400)
        .json(
          sendAPIResponse(
            400,
            "Check your request once more please.",
            null,
            null
          )
        )
        .end();
    }

    const post = await create({
      user: user,
      title: title,
      content: content,
      embed: embed,
    });

    if (!post) {
      return res
        .status(400)
        .json(
          sendAPIResponse(400, "Check your request body once more.", null, null)
        )
        .end();
    }

    return res
      .status(201)
      .json(
        sendAPIResponse(
          201,
          "Post created.",
          { posts: Object.values(post) },
          "arr"
        )
      )
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(sendAPIResponse(500, "We ran into an issue.", null, null));
  }
};

export const deletePost = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id, type } = req.params;

    const deletedPost = await deleteById(id);

    return res
      .status(201)
      .json(sendAPIResponse(201, "Deleted your post.", null, null))
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(sendAPIResponse(500, "We ran into an issue.", null, null));
  }
};

export const getPost = async (req: express.Request, res: express.Response) => {
  try {
    const { id, type } = req.params;

    const post = await getById(id);

    if (!post) {
      return res
        .status(404)
        .json(
          sendAPIResponse(
            404,
            "There is no post connected to the given id",
            null,
            null
          )
        );
    }

    if (type === "json") {
      return res
        .status(200)
        .json(sendAPIResponse(200, "Your requested resource.", post, "json"))
        .end();
    } else {
      return res
        .status(200)
        .json(
          sendAPIResponse(
            200,
            "Your requested resource.",
            { posts: Object.values(post) },
            "arr"
          )
        )
        .end();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(sendAPIResponse(500, "Our bad.", null, null));
  }
};

export const updatePost = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id, type } = req.params;
    const { title, content, embed } = req.body;

    const post = await getById(id);

    if (!post) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "There is no post.", null, null))
        .end();
    }

    if (!title || !content || !embed) {
      return res
        .status(400)
        .json(
          sendAPIResponse(
            400,
            "Please give all the necessary values.",
            null,
            null
          )
        );
    }

    post.title = title;
    post.content = content;
    post.embed = embed;
    await post.save();

    if (type === "json") {
      return res
        .status(200)
        .json(sendAPIResponse(200, "Your updated post.", post, "json"))
        .end();
    } else {
      return res
        .status(200)
        .json(
          sendAPIResponse(
            200,
            "Your updated post.",
            { posts: Object.values(post) },
            "arr"
          )
        )
        .end();
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
