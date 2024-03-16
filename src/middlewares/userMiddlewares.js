const isLoggedIn = (req, res, next) => {
    if (req.session.userId) {
        req.user_id = req.session.userId;
        next();
    } else res.status(401).json({ message: "Bạn chưa đăng nhập" });
};

module.exports = {
    isLoggedIn,
};
