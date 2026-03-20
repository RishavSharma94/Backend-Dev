const express = require("express");
const router = express.Router();

const { getAllStudents, createStudent } = require("../controllers/studentsController");

<<<<<<< HEAD
const {getAllStudents,createStudent,updateStudent,deleteStudent} = require("../controllers/studentsController");
=======
>>>>>>> 7a5fbc4b6d131c0d4f1cf93778a996704e8904dc
router.get("/", getAllStudents);
router.post("/", createStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;