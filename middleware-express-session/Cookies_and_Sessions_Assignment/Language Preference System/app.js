const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Home route
app.get("/", (req, res) => {
  const lang = req.cookies.language || "en";

  let message = "";

  if (lang === "en") message = "Hello User!";
  else if (lang === "hi") message = "नमस्ते उपयोगकर्ता!";
  else if (lang === "fr") message = "Bonjour Utilisateur!";

  res.send(`
    <h1>${message}</h1>

    <form method="POST" action="/set-language">
      <select name="language">
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="fr">French</option>
      </select>
      <button type="submit">Change Language</button>
    </form>
  `);
});

// Set language cookie
app.post("/set-language", (req, res) => {
  const { language } = req.body;

  res.cookie("language", language, {
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});