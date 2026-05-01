const router = require("express").Router();

router.get("/set/:lang", (req, res) => {
    res.cookie("lang", req.params.lang);
    res.send("Language set");
});

module.exports = router;