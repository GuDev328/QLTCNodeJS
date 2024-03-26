const mongoose = require("mongoose");

const spendingCategoriesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    global: { type: Boolean, required: true },
    user_id: { type: mongoose.Types.ObjectId },
    type: { type: Number, required: true }, // 0: Tiền vào, 1: Tiền ra, 2: Chuyển ví, 3: vay, 4: cho vay, 5: thu nợ, 6: trả nợ
    image: { type: String, required: true },
});

const SpendingCategories = mongoose.model(
    "SpendingCategories",
    spendingCategoriesSchema
);

module.exports = SpendingCategories;
