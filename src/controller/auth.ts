// Imports

import express from "express";

// Project-Imports

import { createUser, getUserByEmail } from "../db/users";
import { authentication, random } from "../helpers/auth";
import { sendAPIResponse } from "helpers/respond";

// Code + Exports

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json(sendAPIResponse(400, "Check your request once more.", null, null))
        .end();
    }

    const user = await getUserByEmail(email).select(
      "+auth.salt +auth.password"
    );

    if (!user) {
      return res.sendStatus(400);
    }

    const expectedHash = authentication(user.auth.salt, password);

    if (user.auth.password !== expectedHash) {
      return res.sendStatus(403);
    }

    const salt = random();

    user.auth.salt = salt;

    await user.save();

    return res.status(200).json(sendAPIResponse(200, "Logged in.", null, null))
      .end;
  } catch (error) {
    console.log(error);
    res.status(500).json(sendAPIResponse(500, "Our bad.", null, null)).end();
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.sendStatus(400);
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      auth: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res
      .status(201)
      .json(
        sendAPIResponse(
          201,
          "User was created.",
          {
            users: Object.values(user),
          },
          "arr"
        )
      )
      .end();
  } catch (error) {
    console.log(error);
    return res.status(500).json(sendAPIResponse(500, "Our fault.", null, null));
  }
};
