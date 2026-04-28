const express = require("express");
const mongoose = require("mongoose");

const User = require("./models/User");

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/softDeleteDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Create user
app.post("/users", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

// Get all users (deleted users automatically filtered)
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Soft delete user
app.delete("/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  await user.softDelete();
  res.json({ message: "User soft deleted" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});