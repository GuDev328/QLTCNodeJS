const upload = require("../utils/file.js");
const path = require("path");

const uploadImage = upload.single("image");

const uploadImageMiddleware = (req, res, next) => {
    uploadImage(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        if (req.file) {
            req.filePath = path.resolve(req.file.path);
        }
        next();
    });
};

module.exports = uploadImageMiddleware;
