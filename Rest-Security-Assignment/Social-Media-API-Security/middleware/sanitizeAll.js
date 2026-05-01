const xss = require("xss");
const validator = require("validator");

module.exports = (req, res, next) => {

    // sanitize body
    if (req.body) {
        for (let key in req.body) {
            if (typeof req.body[key] === "string") {
                req.body[key] = xss(req.body[key]);
            }
        }
    }

    // email validation
    if (req.body.email && !validator.isEmail(req.body.email)) {
        return res.status(400).send("Invalid email");
    }

    next();
};