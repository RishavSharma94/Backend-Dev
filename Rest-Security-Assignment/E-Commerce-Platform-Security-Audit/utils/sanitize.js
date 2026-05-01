const xss = require("xss");

exports.sanitizeInput = (input) => xss(input);