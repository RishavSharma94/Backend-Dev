const express = require('express');
const app = express();
const fs = require('fs');

const PORT = 8000;

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");


// Home Page
app.get("/", (req, res) => {
    const students = JSON.parse(fs.readFileSync("students.json"));
    res.render("form", { allStudents: students });
});


// Add Student
app.post("/students/register", (req, res) => {
    const students = JSON.parse(fs.readFileSync("students.json"));

    students.push({
        id: Date.now(),
        name: req.body.name,
        branch: req.body.branch
    });

    fs.writeFileSync("students.json", JSON.stringify(students, null, 2));

    res.redirect("/students");
});


// Show Students (with filter)
app.get("/students", (req, res) => {
    let students = JSON.parse(fs.readFileSync("students.json"));

    if (req.query.branch) {
        students = students.filter(s => s.branch == req.query.branch);
    }

    res.render("students", { students });
});


// Delete Student
app.get("/students/delete/:id", (req, res) => {
    let students = JSON.parse(fs.readFileSync("students.json"));

    students = students.filter(s => s.id != req.params.id);

    fs.writeFileSync("students.json", JSON.stringify(students, null, 2));

    res.redirect("/students");
});


app.listen(PORT, () => {
    console.log("Server running on port 8000");
});
