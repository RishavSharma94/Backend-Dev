const router = require("express").Router();
const { cleanCourse } = require("../utils/courseSanitizer");
const { allowRoles } = require("../middleware/authRoles");

router.post("/", allowRoles("instructor"), (req, res) => {
    const safeDesc = cleanCourse(req.body.description);
    res.send("Course created");
});

module.exports = router;