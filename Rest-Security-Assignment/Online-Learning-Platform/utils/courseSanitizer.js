const xss = require("xss");

const options = {
    whiteList: {
        p: [],
        b: [],
        i: [],
        ul: [],
        li: [],
        a: ["href"]
    }
};

exports.cleanCourse = (input) => xss(input, options);