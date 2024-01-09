// Imports

import express from "express";

// Code

export default function validateAccess(req: express.Request) {
  if (req.headers["authorization"] != undefined) {
    if (req.headers["authorization"] === process.env.KEY) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
