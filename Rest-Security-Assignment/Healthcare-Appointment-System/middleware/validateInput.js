const validator = require("validator");

module.exports = (req, res, next) => {

    if (req.body.email && !validator.isEmail(req.body.email)) {
        return res.send("Invalid Email");
    }

    if (req.body.phone && !validator.isMobilePhone(req.body.phone + "")) {
        return res.send("Invalid Phone");
    }

    if (req.body.date && !validator.isDate(req.body.date + "")) {
        return res.send("Invalid Date");
    }

    next();
};