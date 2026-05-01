const router = require("express").Router();
const multer = require("multer");

const upload = multer({
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowed = [
            "application/pdf",
            "image/jpeg",
            "image/png"
        ];

        if (!allowed.includes(file.mimetype)) {
            return cb(new Error("Invalid file type"));
        }

        cb(null, true);
    }
});

router.post("/", upload.single("file"), (req, res) => {
    res.send("Medical file uploaded safely");
});

module.exports = router;