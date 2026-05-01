const router = require("express").Router();
const { allowRoles } = require("../middleware/authRoles");
const { clean } = require("../utils/sanitizer");

// Only doctor/patient can access
router.get("/:id", allowRoles("doctor", "patient"), (req, res) => {

    // prevent ID tampering
    if (req.params.id !== req.session.user.id) {
        return res.send("Unauthorized access");
    }

    res.send("Medical record सुरक्षित");
});

router.post("/notes", allowRoles("doctor"), (req, res) => {
    const safe = clean(req.body.note);
    res.send("Note saved");
});

module.exports = router;