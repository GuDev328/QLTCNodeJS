const upload = require("../utils/file.js");
const path = require("path");

const uploadAvatar = upload.single("avatar");

const uploadAvatarMiddleware = (req, res, next) => {
    uploadAvatar(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        if (req.file) {
            req.avatarPath = path.resolve(req.file.path);
        }
        next();
    });
};

module.exports = uploadAvatarMiddleware;
