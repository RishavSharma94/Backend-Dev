const router = require("express").Router();
const { loginLimiter } = require("../middleware/rateLimiter");

router.post("/login", loginLimiter, (req, res) => {
    req.session.user = { role: "user" };
    res.send("Login success");
});

module.exports = router;