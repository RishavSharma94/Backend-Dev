exports.isAuthenticated = (req, res, next) => {
    if (!req.session.user) return res.send("Login required");
    next();
};

exports.isAdmin = (req, res, next) => {
    if (req.session.user.role !== "admin") return res.send("Forbidden");
    next();
};