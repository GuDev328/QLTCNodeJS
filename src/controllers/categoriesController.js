const { UploadJPEGToS3 } = require("../utils/s3");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const categoriesServices = require("../services/categoriesServices");

class CategoriesController {
    async createGlobalCategory(req, res) {
        const saveToS3 = await UploadJPEGToS3(req.fileName, req.filePath);
        const linkImage = saveToS3.Location;
        await fs.unlink(path.resolve(req.filePath), (err) => {
            if (err) {
                return res.status(400).json({ message: err.message });
            }
        });
        const payload = {
            name: req.body.name,
            global: true,
            user_id: null,
            type: req.body.type,
            image: linkImage,
        };
        await categoriesServices.createCategory(payload);
        return res.status(200).json({
            message: "Create global category",
        });
    }

    async createCategory(req, res) {
        const payload = {
            name: req.body.name,
            global: false,
            user_id: new mongoose.Types.ObjectId(req.user_id),
            type: req.body.type,
            image: req.body.image,
        };
        await categoriesServices.createCategory(payload);
        return res.status(200).json({
            message: "Create category",
        });
    }

    async getAllCategories(req, res) {
        const payload = {
            user_id: new mongoose.Types.ObjectId(req.user_id),
        };
        const result = await categoriesServices.getAllCategories(payload);
        return res.status(200).json({
            result,
            message: "Get all categories",
        });
    }

    async deleteCategory(req, res) {
        const payload = {
            category_id: new mongoose.Types.ObjectId(req.body.category_id),
            user_id: new mongoose.Types.ObjectId(req.user_id),
        };
        await categoriesServices.deleteCategory(payload);
        return res.status(200).json({
            message: "Delete category",
        });
    }
}

const categoriesController = new CategoriesController();
module.exports = categoriesController;
