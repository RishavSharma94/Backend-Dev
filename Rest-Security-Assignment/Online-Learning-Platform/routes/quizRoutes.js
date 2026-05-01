const router = require("express").Router();
const rateLimit = require("express-rate-limit");

const quizLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 10
});

router.post("/submit", quizLimiter, (req, res) => {
    // lock submission
    if (req.session.submitted) {
        return res.send("Already submitted");
    }

    req.session.submitted = true;
    res.send("Quiz submitted");
});

module.exports = router;