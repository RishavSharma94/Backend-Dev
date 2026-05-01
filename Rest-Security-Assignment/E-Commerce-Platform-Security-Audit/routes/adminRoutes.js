const router = require("express").Router();
const { isAuthenticated, isAdmin } = require("../middleware/auth");

router.get("/", isAuthenticated, isAdmin, (req, res) => {
    res.send("Admin panel");
});

module.exports = router;