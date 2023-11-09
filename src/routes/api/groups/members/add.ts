// Imports

import express from "express";
import fs from "fs-extra";
import { response } from "../../errors/errors";
import { Group, User } from "../../apiTypes";

// Presets

let addRouter = express.Router();
let users: User[] = fs.readJsonSync("src/data/files/users.json").users;
let groups: Group[] = fs.readJsonSync("src/data/files/groups.json").groups;

// Code

addRouter.post("/?userId=:user/?groupId=:group", (req, res) => {
  if (req.headers["authorization"] !== undefined) {
    if (req.headers["authorization"] === process.env.KEY) {
      let user = users.find((u) => u.id === req.params.user);
      if (user !== undefined) {
        let group = groups.find((g) => g.id === req.params.group);
        if (group !== undefined) {
          group.members.push(user.id);
          user.groups.push(group.id);
          users.splice(
            users.indexOf(<User>users.find((us) => us.id === req.params.user))
          );
          groups.splice(
            groups.indexOf(
              <Group>groups.find((gr) => gr.id === req.params.group)
            )
          );
          users.push(user);
          groups.push(group);
          fs.writeJsonSync(
            "src/data/files/groups.json",
            { groups: groups },
            { spaces: 4 }
          );
          fs.writeJsonSync(
            "src/data/files/users.json",
            { users: users },
            { spaces: 4 }
          );
          return res.status(200).json(group);
        } else {
          return res.status(404).json(response(404));
        }
      } else {
        return res.status(404).json(response(404));
      }
    } else {
      return res.status(401).json(response(401));
    }
  } else {
    return res.status(400).json(response(400));
  }
});

// Exports

export default addRouter;
