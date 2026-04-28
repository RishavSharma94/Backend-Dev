// middleware/sanitize.js
function sanitizeInput(data) {
  if (typeof data === "string") {
    return data
      .replace(/<.*?>/g, "")        // remove HTML tags (XSS)
      .replace(/[$]/g, "")          // remove $ (NoSQL injection)
      .replace(/[{}]/g, "");        // remove {} operators
  }

  if (typeof data === "object" && data !== null) {
    for (let key in data) {
      data[key] = sanitizeInput(data[key]);
    }
  }

  return data;
}

const sanitizeMiddleware = (req, res, next) => {
  req.body = sanitizeInput(req.body);
  req.query = sanitizeInput(req.query);
  req.params = sanitizeInput(req.params);

  next();
};

module.exports = sanitizeMiddleware;