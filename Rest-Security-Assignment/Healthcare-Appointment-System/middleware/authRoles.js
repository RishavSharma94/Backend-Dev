exports.allowRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.session.user || !roles.includes(req.session.user.role)) {
            return res.status(403).send("Access Denied");
        }
        next();
    };
};