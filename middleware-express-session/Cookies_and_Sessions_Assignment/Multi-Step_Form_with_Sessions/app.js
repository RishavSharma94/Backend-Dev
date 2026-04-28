const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));

// session setup
app.use(session({
  secret: "secretkey",
  resave: false,
  saveUninitialized: true
}));

// serve static files
app.use(express.static("views"));

// Step 1 page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/step1.html"));
});

// Step 1 submit
app.post("/step1", (req, res) => {
  req.session.user = {
    name: req.body.name,
    email: req.body.email
  };
  res.redirect("/step2");
});

// Step 2 page
app.get("/step2", (req, res) => {
  res.sendFile(path.join(__dirname, "views/step2.html"));
});

// Step 2 submit
app.post("/step2", (req, res) => {
  req.session.user.age = req.body.age;
  req.session.user.city = req.body.city;

  res.redirect("/success");
});

// Final page
app.get("/success", (req, res) => {
  res.send(`
    <h1>Registration Successful</h1>
    <pre>${JSON.stringify(req.session.user, null, 2)}</pre>
  `);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});