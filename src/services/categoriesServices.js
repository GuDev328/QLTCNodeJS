const { default: mongoose } = require("mongoose");
const SpendingCategories = require("../models/spendingCategoriesSchema");
const { ErrorWithStatus } = require("../utils/errorHandler");
const Spending = require("../models/spendingSchema");

class CategoriesServices {
    async createCategory(payload) {
        const { name, global, user_id, type, image } = payload;
        const category = new SpendingCategories({
            name,
            global,
            user_id,
            type,
            image,
        });
        await category.save();
        return;
    }
    async getAllCategories(payload) {
        const { user_id } = payload;
        const categories = await SpendingCategories.find().or([
            { user_id: user_id },
            { global: true },
        ]);
        return categories;
    }

    async deleteCategory(payload) {
        const { category_id, user_id } = payload;
        const findCategory = await SpendingCategories.findById(category_id);
        if (!findCategory) {
            throw new ErrorWithStatus(404, "Không tìm thấy danh mục");
        }
        if (String(findCategory.user_id) !== String(user_id)) {
            throw new ErrorWithStatus(403, "Không có quyền xóa danh mục");
        }

        const spending = await Spending.find({ category_id: category_id });
        if (spending.length > 0) {
            throw new ErrorWithStatus(
                403,
                "Không thể xóa danh mục có đã được dùng trong các giao dịch trước đó"
            );
        }
        await SpendingCategories.findByIdAndDelete(category_id);
        return;
    }
}

const categoriesServices = new CategoriesServices();
module.exports = categoriesServices;
