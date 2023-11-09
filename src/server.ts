// Imports

import express from "express";
import env from "dotenv";
import cors from "cors";
import path from "path";

// API

import apiRouter from "./routes/api/api";

// Presets

const app = express();
let url = "http://localhost:4040";

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

app.listen(4040, () => {
  console.log("Server running on port 4040");
});

app.use("/api", apiRouter);

// Exports

export default url;
