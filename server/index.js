const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const User = require("./models/User");

app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  await user.save();
  res.send({ message: "User registered" });
});

app.listen(5000, () => console.log("Server running on port 5000"));