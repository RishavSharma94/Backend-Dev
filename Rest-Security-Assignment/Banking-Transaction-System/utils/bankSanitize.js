const xss = require("xss");

exports.clean = (input) => {
    if (typeof input === "string") {
        return xss(input);
    }
    return input;
};