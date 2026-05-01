const router = require("express").Router();

router.post("/register", (req, res) => {
    const { username, email, bio, profileUrl } = req.body;

    res.send("User registered safely");
});

module.exports = router;