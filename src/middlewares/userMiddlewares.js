const isLoggedIn = (req, res, next) => {
    if (req.session.loggedIn) next();
    else res.status(401).json({ message: "Bạn chưa đăng nhập" });
};

module.exports = {
    isLoggedIn,
};
