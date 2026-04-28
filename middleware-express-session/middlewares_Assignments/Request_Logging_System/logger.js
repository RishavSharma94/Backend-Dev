// logger.js
const fs = require("fs");
const path = require("path");

const logFile = path.join(__dirname, "requests.log");

const requestLogger = (req, res, next) => {
  const startTime = Date.now();

  res.on("finish", () => {
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    const log = `${new Date().toISOString()} | ${req.method} | ${req.url} | ${res.statusCode} | ${responseTime}ms\n`;

    fs.appendFile(logFile, log, (err) => {
      if (err) console.error(err);
    });
  });

  next();
};

module.exports = requestLogger;