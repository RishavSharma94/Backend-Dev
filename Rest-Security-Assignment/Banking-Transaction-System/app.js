const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const helmet = require("helmet");

const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(express.json());

// Helmet (strict financial security)
app.use(helmet());

// Session (secure cookies)
app.use(session({
    secret: "banksecret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: "mongodb://127.0.0.1:27017/quickbank"
    }),
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 20
    }
}));

// Routes
app.use("/auth", require("./routes/bankAuthRoutes"));
app.use("/tx", require("./routes/transactionRoutes"));
app.use("/account", require("./routes/accountRoutes"));

// Error handler
app.use(errorHandler);

app.listen(5000);