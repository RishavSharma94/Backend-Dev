const jwt = require("jsonwebtoken");
const otpStore = require("../utils/otpStore");

const SECRET = "mysecretkey"; // use env in real apps

const mfaMiddleware = (req, res, next) => {
  try {
    // 1. Check JWT
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;

    // 2. Check OTP
    const otp = req.headers["x-otp"];
    if (!otp) {
      return res.status(401).json({ message: "OTP missing" });
    }

    const validOtp = otpStore.getOTP(decoded.userId);

    if (!validOtp || validOtp !== otp) {
      return res.status(403).json({ message: "Invalid OTP" });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = mfaMiddleware;