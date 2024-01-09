// Imports

import express from "express";

// Project-Imports

import {
  create,
  getAll,
  deleteById,
  updateById,
  getById,
  getByCreator,
} from "../db/groups";
import { sendAPIResponse } from "../helpers/respond";
import { getUserById, updateUserById } from "../db/users";
import validateAccess from "helpers/validateAccess";

// Exports

export const createGroup = async (
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

    const { name, creator, description, members, slogan, city } = req.body;
    const { type } = req.params;

    const group = await create({
      name,
      creator,
      description,
      members,
      slogan,
      city,
    });

    if (!group) {
      return res
        .status(500)
        .json(sendAPIResponse(500, "Our fault.", null, null))
        .end();
    }

    if (type === "json") {
      return res
        .status(201)
        .json(
          sendAPIResponse(201, "Group created successfully.", group, "json")
        )
        .end();
    } else {
      return res
        .status(201)
        .json(
          sendAPIResponse(
            201,
            "Group created successfully.",
            { groups: Object.values(group) },
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
export const getAllGroups = async (
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

    const groups = await getAll();
    if (!groups) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "No groups found.", null, null))
        .end();
    }
    return res
      .status(200)
      .json(
        sendAPIResponse(
          200,
          "Enjoy the contents you requested",
          {
            groups: groups,
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
export const getGroup = async (req: express.Request, res: express.Response) => {
  try {
    if (!validateAccess(req)) {
      return res
        .status(401)
        .json(sendAPIResponse(401, "Unauthorized.", null, null))
        .end();
    }

    const { id, type } = req.params;

    let group = await getById(id);

    if (!group) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "No group found.", null, null))
        .end();
    }

    if (type === "json") {
      return res
        .status(200)
        .json(sendAPIResponse(200, "Your requested group.", group, "json"))
        .end();
    } else {
      return res
        .status(200)
        .json(
          sendAPIResponse(
            200,
            "Your requested group.",
            { groups: Object.values(group) },
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
export const getGroupByCreator = async (
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

    const { creator } = req.params;

    let user = await getUserById(creator);

    if (!user) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "No user found.", null, null))
        .end();
    }

    let groups = getByCreator(creator);

    if (!groups) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "No groups found.", null, null))
        .end();
    }

    return res
      .status(200)
      .json(sendAPIResponse(200, "Your requested groups.", groups, "arr"))
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(sendAPIResponse(500, "Our fault.", null, null))
      .end();
  }
};
export const joinGroup = async (
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

    const { id, userId } = req.body;

    let group = await getById(id);

    if (!group) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "No group found.", null, null))
        .end();
    }

    const user = await getUserById(userId);

    if (!user) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "No user found.", null, null))
        .end();
    }

    group.members.push(user);
    await updateById(id, group);
    user.groups.push(group);
    await updateUserById(userId, user);

    return res
      .status(204)
      .json(sendAPIResponse(204, "Joined group successfully.", null, null))
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(sendAPIResponse(500, "Our fault.", null, null))
      .end();
  }
};
export const leaveGroup = async (
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

    const { id, userId } = req.body;

    let group = await getById(id);

    if (!group) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "No group found.", null, null))
        .end();
    }

    const user = await getUserById(userId);

    if (!user) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "No user found.", null, null))
        .end();
    }

    group.members = group.members.filter((member) => member.id !== userId);
    await updateById(id, group);
    user.groups = user.groups.filter((group) => group.id !== id);
    await updateUserById(userId, user);

    return res
      .status(204)
      .json(sendAPIResponse(204, "Left group successfully.", null, null))
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(sendAPIResponse(500, "Our fault.", null, null))
      .end();
  }
};
export const deleteGroup = async (
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

    const deletedGroup = await deleteById(id);

    if (!deletedGroup) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "No group found.", null, null))
        .end();
    }

    return res
      .status(204)
      .json(sendAPIResponse(204, "No Contents", null, null))
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(sendAPIResponse(500, "Our fault.", null, null))
      .end();
  }
};
export const updateGroup = async (
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

    let group = await getById(id);

    if (!group) {
      return res
        .status(404)
        .json(sendAPIResponse(404, "No group found.", null, null))
        .end();
    }

    const { name, creator, description, members, slogan, city } = req.body;

    if (!name || !creator || !description || !members || !slogan || !city) {
      return res
        .status(400)
        .json(sendAPIResponse(400, "Bad request.", null, null))
        .end();
    }
    group.name = name;
    group.creator = creator;
    group.description = description;
    group.members = members;
    group.slogan = slogan;
    group.city = city;
    await updateById(id, group);

    if (type === "json") {
      return res
        .status(200)
        .json(sendAPIResponse(200, "Updated group.", group, "json"))
        .end();
    } else {
      return res
        .status(200)
        .json(
          sendAPIResponse(
            200,
            "Updated group.",
            { groups: Object.values(group) },
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
