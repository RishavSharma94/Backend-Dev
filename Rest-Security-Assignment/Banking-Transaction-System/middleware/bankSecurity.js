const rateLimit = require("express-rate-limit");

exports.loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5
});

exports.transferLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 3
});

exports.suspiciousCheck = (req, res, next) => {
    if (req.body.amount > 100000) {
        return res.send("Suspicious transaction blocked");
    }
    next();
};