module.exports = (req, res, next) => {
    console.log(`[AUDIT] ${req.method} ${req.url} User: ${req.session?.user?.role}`);
    next();
};