const router = require("express").Router();
const { validateSearch } = require("../middleware/validate");

router.get("/search", validateSearch, (req, res) => {
    res.send("Safe search result");
});

module.exports = router;