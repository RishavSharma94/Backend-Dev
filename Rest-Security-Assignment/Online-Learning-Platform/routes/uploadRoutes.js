const router = require("express").Router();
const multer = require("multer");

const upload = multer({
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== "application/pdf") {
            return cb(new Error("Only PDF allowed"));
        }
        cb(null, true);
    }
});

router.post("/", upload.single("file"), (req, res) => {
    res.send("File uploaded safely");
});

module.exports = router;