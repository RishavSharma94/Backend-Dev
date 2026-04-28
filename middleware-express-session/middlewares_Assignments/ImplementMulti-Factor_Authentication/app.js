const express = require("express");
const jwt = require("jsonwebtoken");

const mfaMiddleware = require("./middleware/mfaMiddleware");
const otpStore = require("./utils/otpStore");

const app = express();
app.use(express.json());

const SECRET = "mysecretkey";

// login route → generate token + OTP
app.post("/login", (req, res) => {
  const user = { userId: 1, name: "Rishav" };

  const token = jwt.sign(user, SECRET, { expiresIn: "1h" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.setOTP(user.userId, otp);

  res.json({
    token,
    otp, // in real apps, send via SMS/Email
  });
});

// protected route (requires JWT + OTP)
app.get("/secure-data", mfaMiddleware, (req, res) => {
  res.json({ message: "Sensitive data accessed!" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});