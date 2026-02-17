const express = require("express");
const app = express();

// ===== Settings =====
app.set("view engine", "ejs");

// ===== Middlewares =====
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const logger = require("./middleware/logger");
app.use(logger);

// ===== Routes Files =====
const usersRoute = require("./routes/users");
const blogRoute = require("./routes/blog");

app.use("/users", usersRoute);
app.use("/blog", blogRoute);

// ===== Contact Routes =====
app.get("/contact", (req, res) => {
  res.render("contact");
});

app.post("/contact", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  res.send("Form received from " + name + " (" + email + ")");
});

// ===== Gallery Route =====
app.get("/gallery", (req, res) => {
  const images = ["photo1.jpg", "photo2.jpg"];
  res.render("gallery", { images });
});

// ===== Home Route =====
app.get("/", (req, res) => {
  res.send("Welcome to Practice Assignment");
});

// ===== 404 Handler (Always Last) =====
app.use((req, res) => {
  res.status(404).render("404");
});

// ===== Server =====
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
