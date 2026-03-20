const express = require('express');
const studentsRoutes = require("./routes/studentsRoutes");

const app = express();
app.use(express.json());

const PORT = 8000;


app.use("/api/students/", studentsRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});