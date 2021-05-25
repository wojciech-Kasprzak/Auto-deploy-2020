const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const server = require("http").Server(app);
const exec = require("child_process").exec;
const fs = require("fs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({
    message: "Auto Deploy by Wojciech Kasprzak",
  });
});

require("./app/routes/git.routes.js")(app, exec, fs);

server.listen(9000, () => {
  console.log("Server is listening on port 9000");
});
