const router = require("express").Router();

router.post("/", (req, res) => {

    if (!req.body.date) {
        return res.send("Date required");
    }

    res.send("Appointment booked safely");
});

module.exports = router;