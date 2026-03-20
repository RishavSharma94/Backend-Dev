const fs = require("fs").promises;
const express = require("express");
const app = express();

// middleware
app.use(express.json());

const PORT = 8000;
app.listen(PORT, () => {
  console.log("Server is listening on port:8000");
});

// READ / WRITE 

// READ FUNCTION
const readStudentsFromFile = async () => {
  try {
    const data = await fs.readFile("./students.json", "utf-8");
    return JSON.parse(data || "[]");
  } catch (err) {
    return [];
  }
};

// WRITE FUNCTION
const writeStudentsToFile = async (records) => {
  try {
    await fs.writeFile(
      "./students.json",
      JSON.stringify(records, null, 2)
    );
  } catch (err) {
    throw err;
  }
};

//  ROUTES 

// GET all students
app.get("/students", async (req, res) => {
  try {
    const students = await readStudentsFromFile();
    return res.status(200).json(students);
  } catch {
    return res.status(500).send("Internal Server Error");
  }
});

// POST student
app.post("/students/register", async (req, res) => {
  try {
    const { name, branch } = req.body;

    if (!name || !branch) {
      return res.status(400).json({ message: "Name and branch required" });
    }

    const students = await readStudentsFromFile();

    const newStudent = {
      id: students.length ? students[students.length - 1].id + 1 : 1,
      name,
      branch,
    };

    students.push(newStudent);
    await writeStudentsToFile(students);

    return res.status(201).json({
      message: "Student added successfully",
      student: newStudent,
    });
  } catch {
    return res.status(500).send("Internal Server Error");
  }
});

// PUT student
app.put("/students/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Empty body not allowed" });
    }

    const students = await readStudentsFromFile();
    const index = students.findIndex(s => s.id === userId);

    if (index === -1) {
      return res.status(404).send("Student not found");
    }

    students[index] = { ...students[index], ...req.body };
    await writeStudentsToFile(students);

    return res.status(200).json({
      message: "Updated Successfully",
      student: students[index],
    });
  } catch {
    return res.status(500).send("Internal Server Error");
  }
});

// DELETE student
app.delete("/students/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    const students = await readStudentsFromFile();
    const index = students.findIndex(s => s.id === userId);

    if (index === -1) {
      return res.status(404).send("Student not found");
    }

    const deletedStudent = students.splice(index, 1);
    await writeStudentsToFile(students);

    return res.status(200).json({
      message: "Student deleted successfully",
      deletedStudent: deletedStudent[0],
    });
  } catch {
    return res.status(500).send("Internal Server Error");
  }
});
