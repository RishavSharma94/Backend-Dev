const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();
app.use(express.json());

// Logging
app.use(morgan("dev"));

// Helmet (CSP for S3 + Stripe)
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            imgSrc: ["'self'", "https://s3.amazonaws.com"],
            scriptSrc: ["'self'", "https://js.stripe.com"],
            connectSrc: ["'self'", "https://api.stripe.com"],
            frameSrc: ["https://www.youtube.com"]
        }
    }
}));

// Session (MongoStore)
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: "mongodb://127.0.0.1:27017/edulearn"
    }),
    cookie: {
        maxAge: 1000 * 60 * 30
    }
}));

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/courses", require("./routes/courseRoutes"));
app.use("/quiz", require("./routes/quizRoutes"));
app.use("/upload", require("./routes/uploadRoutes"));

app.listen(5000, () => console.log("Server running"));