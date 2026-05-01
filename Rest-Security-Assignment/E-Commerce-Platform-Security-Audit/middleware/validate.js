exports.validateSearch = (req, res, next) => {
    const q = req.query.q;
    if (!q || typeof q !== "string") {
        return res.send("Invalid input");
    }
    next();
};