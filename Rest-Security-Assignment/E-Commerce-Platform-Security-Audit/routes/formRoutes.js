const router = require("express").Router();

router.post("/step1", (req, res) => {
    req.session.step1 = req.body;
    res.send("Step1 saved");
});

router.post("/step2", (req, res) => {
    req.session.step2 = req.body;
    res.send("Done");
});

module.exports = router;