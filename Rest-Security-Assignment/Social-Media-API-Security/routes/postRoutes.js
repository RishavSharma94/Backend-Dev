const router = require("express").Router();
const { cleanHTML } = require("../utils/htmlSanitizer");

router.post("/", (req, res) => {
    const safePost = cleanHTML(req.body.content);
    res.send(safePost);
});

module.exports = router;