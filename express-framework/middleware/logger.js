function logger(req, res, next) {
  const start = new Date().getTime();

  res.on("finish", function () {
    const end = new Date().getTime();
    console.log("Time taken:", end - start, "ms");
  });

  next();
}

module.exports = logger;
