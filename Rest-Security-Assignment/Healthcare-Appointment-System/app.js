const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const helmet = require("helmet");

const validateInput = require("./middleware/validateInput");
const auditLogger = require("./middleware/auditLogger");

const app = express();
app.use(express.json());

// Helmet (Healthcare strict security)
app.use(helmet());

// Input validation
app.use(validateInput);

// Audit logging
app.use(auditLogger);

// Session (short timeout for healthcare)
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: "mongodb://127.0.0.1:27017/medibook"
    }),
    cookie: {
        maxAge: 1000 * 60 * 15 // 15 min
    }
}));

// Routes
app.use("/medical", require("./routes/medicalRoutes"));
app.use("/appointment", require("./routes/appointmentRoutes"));
app.use("/upload", require("./routes/uploadRoutes"));

app.listen(5000);