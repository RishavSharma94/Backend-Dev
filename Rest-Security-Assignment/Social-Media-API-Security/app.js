const cors = require("cors");
const sanitizeAll = require("./middleware/sanitizeAll");

// CORS (Task 5)
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}));

// Global sanitization (Task 6)
app.use(sanitizeAll);

// Routes add
app.use("/users", require("./routes/userRoutes"));
app.use("/posts", require("./routes/postRoutes"));
app.use("/messages", require("./routes/messageRoutes"));
app.use("/comments", require("./routes/commentRoutes"));