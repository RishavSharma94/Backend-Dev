const express = require("express");
const mongoose = require("mongoose");

const User = require("./models/User");

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/activityDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Create user
app.post("/register", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

// Login route
app.post("/login/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  await user.recordLogin();
  res.json({ message: "Login time recorded", user });
});

// Logout route
app.post("/logout/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  await user.recordLogout();
  res.json({ message: "Logout time recorded", user });
});

// Update activity (any action)
app.put("/activity/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  user.lastActive = new Date();
  await user.save();
  res.json({ message: "Last active updated", user });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});