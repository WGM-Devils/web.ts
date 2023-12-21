import express from "express";

import { deleteUserById, getUserById, getUsers } from "../db/users";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { type } = req.params;
    const users = await getUsers();

    if (type === "json") {
      return res.status(200).json(users).end();
    } else {
      return res
        .status(200)
        .json({ users: Object.values(users) })
        .end();
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { type } = req.params;

    const deletedUser = await deleteUserById(id);

    if (type === "json") {
      return res.status(200).json(deletedUser).end();
    } else {
      return res
        .status(200)
        .json({ users: Object.values(deletedUser) })
        .end();
    }
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { username } = req.body;
    const { type } = req.params;

    if (!username) {
      return res.sendStatus(403);
    }

    const user = await getUserById(id);
    user.username = username;
    await user.save();

    if (type === "json") {
      return res.status(200).json(user).end();
    } else {
      return res
        .status(200)
        .json({ users: Object.values(user) })
        .end();
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
