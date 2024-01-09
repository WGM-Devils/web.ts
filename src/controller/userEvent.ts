// Imports

import express from "express";

// Project-Imports

import { sendAPIResponse } from "../helpers/respond";
import validateAccess from "../helpers/validateAccess";
import {
  create,
  getAll,
  getAllByCreator,
  deleteById,
  updateById,
  getById,
} from "../db/userEvent";

// Exports

export const getAllUserEvents = async (
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

    const userEvents = await getAll();

    if (!userEvents) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "No userEvents found.", null, null))
        .end();
    }
    return res
      .status(200)
      .json(
        sendAPIResponse(
          200,
          "Enjoy the contents you requested",
          {
            userEvents: userEvents,
          },
          "arr"
        )
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
export const createUserEvent = async (
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

    const { type } = req.params;

    const userEvent = await create(req.body);

    if (!userEvent) {
      return res
        .status(400)
        .json(
          sendAPIResponse(400, "Check the request body once more", null, null)
        )
        .end();
    }

    if (type === "json") {
      return res
        .status(200)
        .json(
          sendAPIResponse(200, "Your created userEvent...", userEvent, "json")
        )
        .end();
    } else {
      return res
        .status(200)
        .json(
          sendAPIResponse(
            200,
            "Your created userEvent...",
            { userEvents: Object.values(userEvent) },
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
export const deleteUserEvent = async (
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

    const { id } = req.params;

    const userEvent = await deleteById(id);

    if (!userEvent) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "No userEvent found.", null, null))
        .end();
    }

    return res
      .status(204)
      .json(sendAPIResponse(204, "Deleted.", null, null))
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(sendAPIResponse(500, "Our fault.", null, null))
      .end();
  }
};
export const updateUserEvent = async (
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

    const { id, type } = req.params;

    const userEvent = await updateById(id, req.body);

    if (!userEvent) {
      return res
        .status(400)
        .json(sendAPIResponse(400, "Check your request once more.", null, null))
        .end();
    }
    if (type === "json") {
      return res
        .status(200)
        .json(
          sendAPIResponse(
            200,
            "Your updated userEvent is ready.",
            userEvent,
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
            "Your updated userEvent is ready.",
            { userEvents: Object.values(userEvent) },
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
export const getUserEvent = async (
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

    const { id, type } = req.params;

    const userEvent = await getById(id);

    if (!userEvent) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "No userEvent found.", null, null))
        .end();
    }

    if (type === "json") {
      return res
        .status(200)
        .json(
          sendAPIResponse(200, "Your requested userEvent.", userEvent, "json")
        )
        .end();
    } else {
      return res
        .status(200)
        .json(
          sendAPIResponse(
            200,
            "Your requested userEvent.",
            { userEvents: Object.values(userEvent) },
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
export const getAllUserEventsByCreator = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const userEvents = await getAllByCreator(id);

    if (!userEvents) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "No userEvents found.", null, null))
        .end();
    }
    return res
      .status(200)
      .json(
        sendAPIResponse(
          200,
          "Enjoy the contents you requested",
          {
            userEvents: userEvents,
          },
          "arr"
        )
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
