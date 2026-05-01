const router = require("express").Router();
const { clean } = require("../utils/bankSanitize");

// Update profile
router.post("/update", (req, res) => {

    const name = clean(req.body.name);

    res.send("Profile updated safely");
});

// Beneficiary
router.post("/beneficiary", (req, res) => {

    if (!req.body.accountNumber || req.body.accountNumber.length < 6) {
        return res.send("Invalid account number");
    }

    res.send("Beneficiary added");
});

module.exports = router;