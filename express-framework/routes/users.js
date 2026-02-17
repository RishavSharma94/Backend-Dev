const express = require("express");
const router = express.Router();

const users = [
  { id: 1, name: "Rishav" },
  { id: 2, name: "Aman" },
  { id: 3, name: "Rahul" }
];

router.get("/", (req, res) => {
  let name = req.query.name;
  let result = users;

  if (name) {
    result = users.filter(u => 
      u.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  res.render("users", { users: result });
});

module.exports = router;
