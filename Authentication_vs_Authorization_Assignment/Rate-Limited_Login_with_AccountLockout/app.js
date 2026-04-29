const express = require('express');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

// Dummy users (password hashed)
const users = [
    {
        email: "john@example.com",
        password: bcrypt.hashSync("Password123!", 10)
    }
];

// email -> { count, firstAttemptTime, lockUntil }
const loginAttempts = new Map();

const MAX_ATTEMPTS = 5;
const WINDOW_TIME = 60 * 60 * 1000; // 1 hour
const LOCK_TIME = 30 * 60 * 1000;   // 30 minutes


// ✅ Check Login Attempts
function checkLoginAttempts(email) {
    const record = loginAttempts.get(email);

    if (!record) return { allowed: true };

    const now = Date.now();

    // If account is locked
    if (record.lockUntil && now < record.lockUntil) {
        return {
            allowed: false,
            message: "Account locked. Try again later"
        };
    }

    // Reset if window expired
    if (now - record.firstAttemptTime > WINDOW_TIME) {
        loginAttempts.delete(email);
        return { allowed: true };
    }

    return { allowed: true };
}


// ❌ Record Failed Attempt
function recordFailedAttempt(email) {
    const now = Date.now();
    let record = loginAttempts.get(email);

    if (!record) {
        record = {
            count: 1,
            firstAttemptTime: now,
            lockUntil: null
        };
    } else {
        record.count += 1;
    }

    // Lock account if exceeded attempts
    if (record.count >= MAX_ATTEMPTS) {
        record.lockUntil = now + LOCK_TIME;
    }

    loginAttempts.set(email, record);
}


// ✅ Clear Attempts (on success)
function clearAttempts(email) {
    loginAttempts.delete(email);
}


// 🔐 Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const check = checkLoginAttempts(email);
    if (!check.allowed) {
        return res.status(403).json({ message: check.message });
    }

    const user = users.find(u => u.email === email);

    if (!user) {
        recordFailedAttempt(email);
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        recordFailedAttempt(email);

        const record = loginAttempts.get(email);

        if (record.count >= MAX_ATTEMPTS) {
            return res.status(403).json({
                message: "Too many failed attempts. Account locked for 30 minutes"
            });
        }

        return res.status(401).json({ message: "Invalid email or password" });
    }

    // Success
    clearAttempts(email);

    res.json({
        message: "Login successful"
    });
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});