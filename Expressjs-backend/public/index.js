const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "form.html"));
});

app.post("/register", (req, res) => {

  const student = {
    name: req.body.name,
    branch: req.body.branch
  };

  // read file
  fs.readFile("students.json", "utf8", (err, data) => {

    let students = JSON.parse(data); // string → object

    students.push(student);

    // write file
    fs.writeFile("students.json", JSON.stringify(students), (err) => {
      if (err) {
        res.send("Error");
      } else {
        res.send("Saved Successfully");
      }
    });

  });

});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
