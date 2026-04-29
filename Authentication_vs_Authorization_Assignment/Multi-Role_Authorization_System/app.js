const express = require('express');
const session = require('express-session');

const app = express();
app.use(express.json());

app.use(session({
    secret: 'auth-secret',
    resave: false,
    saveUninitialized: false
}));

const users = [];
const posts = [];

// Dummy Login (for testing roles)
app.post('/login', (req, res) => {
    const { username, role } = req.body;

    if (!username || !role) {
        return res.status(400).json({ message: "Username and role required" });
    }

    req.session.user = { username, role };
    res.json({ message: "Logged in", user: req.session.user });
});

// Authentication Middleware
const isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Unauthorized: Please login" });
    }
    next();
};

// Role-based Authorization Middleware
const requireRole = (role) => {
    return (req, res, next) => {
        const user = req.session.user;

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Admin can do everything
        if (user.role === 'admin') {
            return next();
        }

        // Moderator can access moderator + user
        if (role === 'user') return next();
        if (role === 'moderator' && user.role === 'moderator') return next();

        return res.status(403).json({ message: "Forbidden: Access denied" });
    };
};

// Ownership OR Moderator/Admin check
const isOwnerOrModerator = (req, res, next) => {
    const user = req.session.user;
    const postId = req.params.id;

    const post = posts.find(p => p.id == postId);

    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    // Owner OR Moderator OR Admin
    if (
        post.author === user.username ||
        user.role === 'moderator' ||
        user.role === 'admin'
    ) {
        req.post = post; // attach post
        return next();
    }

    return res.status(403).json({ message: "Forbidden: Not allowed" });
};

// Create Post (only logged-in users)
app.post('/posts', isAuthenticated, (req, res) => {
    const { content } = req.body;

    const newPost = {
        id: posts.length + 1,
        content,
        author: req.session.user.username
    };

    posts.push(newPost);

    res.status(201).json({
        message: "Post created",
        post: newPost
    });
});

// Edit Post
app.put('/posts/:id', isAuthenticated, isOwnerOrModerator, (req, res) => {
    const { content } = req.body;

    req.post.content = content;

    res.json({
        message: "Post updated",
        post: req.post
    });
});

// Delete Post (Moderator or Admin)
app.delete('/posts/:id',
    isAuthenticated,
    requireRole('moderator'),
    (req, res) => {

        const { id } = req.params;

        const index = posts.findIndex(p => p.id == id);

        if (index === -1) {
            return res.status(404).json({ message: "Post not found" });
        }

        posts.splice(index, 1);

        res.json({
            message: "Post deleted"
        });
    }
);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});