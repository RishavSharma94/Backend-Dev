// app.js
const express = require("express");
const sanitizeMiddleware = require("./middleware/sanitize");

const app = express();
app.use(express.json());

// apply middleware globally
app.use(sanitizeMiddleware);

// test route
app.post("/data", (req, res) => {
  res.json({
    message: "Sanitized Data",
    data: req.body
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});