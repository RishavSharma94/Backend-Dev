const xss = require("xss");

exports.clean = (input) => xss(input);