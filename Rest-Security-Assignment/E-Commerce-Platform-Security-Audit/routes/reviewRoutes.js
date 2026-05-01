const router = require("express").Router();
const { sanitizeInput } = require("../utils/sanitize");

router.post("/", (req, res) => {
    const safe = sanitizeInput(req.body.review);
    res.send(safe);
});

module.exports = router;