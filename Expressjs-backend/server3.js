const express = require('express');
const app = express();
const fs = require('fs');

const PORT = 8000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const students = [
    { id: 1, name: 'Raj', branch: 'CSE' },
    { id: 2, name: 'Ajay', branch: 'ECE' },
    { id: 3, name: 'Yash', branch: 'ME' },
];
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("form", {allStudents: students});
});

app.post('/students/register', (req, res) => {
    console.log("form data", req.body);
    res.send("Form submitted successfully");
    // students.push(req.body);
});

app.listen(PORT, () => {console.log(`Server running on port ${PORT}`); })
