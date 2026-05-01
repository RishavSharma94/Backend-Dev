const router = require("express").Router();
const { transferLimiter, suspiciousCheck } = require("../middleware/bankSecurity");
const { clean } = require("../utils/bankSanitize");

// Transfer
router.post("/transfer", transferLimiter, suspiciousCheck, (req, res) => {

    const amount = Number(req.body.amount);

    if (amount <= 0 || amount > 1000000) {
        return res.send("Invalid amount");
    }

    if (amount > 1000 && req.body.otp !== "123456") {
        return res.send("2FA required");
    }

    res.send("Transaction successful");
});

// History (prevent injection)
router.get("/history", (req, res) => {

    if (req.query.userId !== req.session.user.id) {
        return res.send("Unauthorized");
    }

    res.send("Transaction history");
});

module.exports = router;