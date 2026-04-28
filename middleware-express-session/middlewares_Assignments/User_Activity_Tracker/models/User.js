const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,

  loginTime: Date,
  logoutTime: Date,
  lastActive: Date
});

// Middleware: Before saving (update last active)
userSchema.pre("save", function (next) {
  this.lastActive = new Date();
  next();
});

// Middleware: After login simulation
userSchema.methods.recordLogin = function () {
  this.loginTime = new Date();
  this.lastActive = new Date();
  return this.save();
};

// Middleware: After logout simulation
userSchema.methods.recordLogout = function () {
  this.logoutTime = new Date();
  return this.save();
};

module.exports = mongoose.model("User", userSchema);