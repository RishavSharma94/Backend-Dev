const xss = require("xss");

const options = {
    whiteList: {
        b: [],
        i: [],
        a: ["href"]
    }
};

exports.cleanHTML = (input) => xss(input, options);