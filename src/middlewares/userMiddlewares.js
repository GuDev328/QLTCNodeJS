const isLoggedIn = (req, res, next) => {
    if (req.session.userId) {
        req.user_id = req.session.userId;
        next();
    } else res.status(401).json({ message: "Bạn chưa đăng nhập" });
};

const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.user_id);
    if (user && user.isAdmin) {
        next();
    } else res.status(403).json({ message: "Bạn không có quyền truy cập" });
};

module.exports = {
    isLoggedIn,
    isAdmin,
};
