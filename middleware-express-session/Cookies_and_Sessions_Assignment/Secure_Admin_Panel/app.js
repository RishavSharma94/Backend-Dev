const express = require("express");
const session = require("express-session");
const path = require("path");

const isAuthenticated = require("./middleware/auth");
const isAdmin = require("./middleware/role");

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

// dummy users
const users = [
  { username: "admin", password: "123", role: "admin" },
  { username: "user", password: "123", role: "user" }
];

// login page
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views/login.html"));
});

// login logic
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.send("Invalid credentials");
  }

  req.session.user = user;

  res.redirect("/dashboard");
});

// dashboard (for all logged users)
app.get("/dashboard", isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "views/dashboard.html"));
});

// admin panel (only admin)
app.get("/admin", isAuthenticated, isAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, "views/admin.html"));
});

// logout
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});