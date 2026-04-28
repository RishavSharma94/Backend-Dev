const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,

  isDeleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

/* Middleware: Automatically filter out deleted docs */
userSchema.pre(/^find/, function (next) {
  this.where({ isDeleted: false });
  next();
});

/* Soft delete method */
userSchema.methods.softDelete = function () {
  this.isDeleted = true;
  return this.save();
};

module.exports = mongoose.model("User", userSchema);