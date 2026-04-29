const express = require('express');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Session setup
app.use(session({
    secret: 'passport-secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

const SECRET_KEY = "jwt-secret";

// Dummy users
const users = [
    { id: 1, username: "john", password: "1234" }
];

// Serialize / Deserialize (for session)
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = users.find(u => u.id === id);
    done(null, user);
});


// 🔐 Local Strategy (username + password)
passport.use('local', new LocalStrategy(
    (username, password, done) => {
        const user = users.find(u => u.username === username);

        if (!user) {
            return done(null, false, { message: "User not found" });
        }

        if (user.password !== password) {
            return done(null, false, { message: "Wrong password" });
        }

        return done(null, user);
    }
));


// 🔐 JWT Strategy
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET_KEY
};

passport.use('jwt', new JwtStrategy(opts, (payload, done) => {
    const user = users.find(u => u.id === payload.id);

    if (user) {
        return done(null, user);
    } else {
        return done(null, false);
    }
}));


// ✅ Session-based Login
app.post('/auth/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return res.status(500).json({ message: "Server error" });

        if (!user) {
            return res.status(401).json({ message: info.message });
        }

        req.login(user, (err) => {
            if (err) return res.status(500).json({ message: "Login failed" });

            return res.json({
                message: "Login successful (session)",
                user
            });
        });
    })(req, res, next);
});


// ✅ API Login (JWT)
app.post('/auth/api-login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) return res.status(500).json({ message: "Server error" });

        if (!user) {
            return res.status(401).json({ message: info.message });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        return res.json({
            message: "Login successful (JWT)",
            token
        });
    })(req, res, next);
});


// 🔒 Session Protected Route
app.get('/dashboard', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Login required" });
    }

    res.json({
        message: "Welcome to dashboard",
        user: req.user
    });
});


// 🔒 JWT Protected Route
app.get('/api/profile',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json({
            message: "Profile data",
            user: req.user
        });
    }
);


app.listen(3000, () => {
    console.log("Server running on port 3000");
});