// Imports

import express from "express";
import env from "dotenv";
import cors from "cors";
import path from "path";

// Presets

const app = express();

// Configs

env.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    methods: ["GET", "POST", "PATCH", "DELETE"],
    origin: "*",
  })
);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Code
