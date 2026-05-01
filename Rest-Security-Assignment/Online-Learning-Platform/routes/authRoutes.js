const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, 10);

    // save user (pseudo)
    res.send("User registered");
});

router.post("/login", async (req, res) => {
    // after password check
    if (req.body.role === "instructor") {
        // simple MFA check (demo)
        if (req.body.otp !== "123456") {
            return res.send("MFA Failed");
        }
    }

    req.session.user = { role: req.body.role };
    res.send("Login success");
});