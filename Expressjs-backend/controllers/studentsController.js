const fs = require("fs").promises;

// GET
const getAllStudents = async (req, res) => {
    const data = await fs.readFile("./students.json", "utf-8");
    const students = JSON.parse(data);
    res.json(students);
};

// POST
const createStudent = async (req, res) => {
    const { name, age } = req.body;

    // file read
    const data = await fs.readFile("./students.json", "utf-8");
    const students = JSON.parse(data);

    // new student
    const newStudent = {
        id: students.length + 1,
        name,
        age
    };

    students.push(newStudent);

    // file write
    await fs.writeFile("./students.json", JSON.stringify(students, null, 2));

    res.json(newStudent);
};

// Update
const updateStudent = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, age } = req.body;

    const data = await fs.readFile("./students.json", "utf-8");
    const students = JSON.parse(data);

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.json({ message: "Student not found" });
    }

    students[index] = { id, name, age };

    await fs.writeFile("./students.json", JSON.stringify(students, null, 2));

    res.json({ message: "Student updated", data: students[index] });
};



// Delete

const deleteStudent = async (req, res) => {
    const id = parseInt(req.params.id);

    const data = await fs.readFile("./students.json", "utf-8");
    const students = JSON.parse(data);

    const filteredStudents = students.filter(s => s.id !== id);

    await fs.writeFile("./students.json", JSON.stringify(filteredStudents, null, 2));

    res.json({ message: "Student deleted" });
};

module.exports = {
    getAllStudents,
    createStudent,
    updateStudent,
    deleteStudent
};