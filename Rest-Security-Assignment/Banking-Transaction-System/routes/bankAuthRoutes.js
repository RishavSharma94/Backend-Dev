const router = require("express").Router();
const { loginLimiter } = require("../middleware/bankSecurity");
const { generateToken } = require("../utils/token");

let resetTokens = {};

// Login
router.post("/login", loginLimiter, (req, res) => {
    req.session.user = { id: "123" };
    res.send("Login success");
});

// 2FA for large transactions
router.post("/verify-2fa", (req, res) => {
    if (req.body.otp !== "123456") {
        return res.send("2FA failed");
    }
    res.send("2FA success");
});

// Password reset
router.post("/reset", (req, res) => {
    const token = generateToken();

    resetTokens[token] = Date.now() + 10 * 60 * 1000; // 10 min expiry

    res.send("Reset token generated");
});

router.post("/reset/:token", (req, res) => {
    if (!resetTokens[req.params.token] || resetTokens[req.params.token] < Date.now()) {
        return res.send("Token expired");
    }

    delete resetTokens[req.params.token];
    res.send("Password updated");
});

module.exports = router;