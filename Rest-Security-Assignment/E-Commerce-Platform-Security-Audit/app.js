const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const helmet = require("helmet");

const app = express();
app.use(express.json());

// Helmet (Problem 1)
app.use(helmet());

// Session (Problem 1 + 2)
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/test" })
}));

// Routes import
app.use("/auth", require("./routes/authRoutes"));
app.use("/products", require("./routes/productRoutes"));
app.use("/reviews", require("./routes/reviewRoutes"));
app.use("/form", require("./routes/formRoutes"));       // Problem 2
app.use("/lang", require("./routes/langRoutes"));       // Problem 3
app.use("/admin", require("./routes/adminRoutes"));     // Problem 4

app.listen(5000);