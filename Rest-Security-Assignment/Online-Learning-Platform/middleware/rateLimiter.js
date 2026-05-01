const rateLimit = require("express-rate-limit");

exports.loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5
});

exports.quizLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 10
});