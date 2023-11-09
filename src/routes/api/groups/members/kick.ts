// Imports

import express from "express";
import fs from "fs-extra";
import { Group, User } from "../../apiTypes";
import { response } from "../../errors/errors";

// Presets

let users: User[] = fs.readJsonSync("src/data/files/users.json").users;
let groups: Group[] = fs.readJsonSync("src/data/files/groups.json").groups;
let kickRouter = express.Router();

// Code

kickRouter.get("/?userId=:user/?groupId=:group", (req, res) => {
  if (req.headers["authorization"] !== undefined) {
    if (req.headers["authorization"] === process.env.KEY) {
      if (users.find((u) => u.id === req.params.user)) {
        let user = users.find((u) => u.id === req.params.user);
        if (groups.find((g) => g.id === req.params.group)) {
          user?.groups.splice(user.groups.indexOf(req.params.group));
          let group = groups.find((g) => g.id === req.params.group);
          group?.members.splice(group.members.indexOf(<string>user?.id));
          groups.splice(
            groups.indexOf(<Group>groups.find((gr) => gr.id === group?.id))
          );
          users.splice(
            users.indexOf(<User>users.find((us) => us.id === user?.id))
          );
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
          return res.json(200).json({ groups: [group] });
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

export default kickRouter;
