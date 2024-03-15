const mongoose = require("mongoose");

const spendingCategoriesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: Number, required: true }, // 0 for In, 1 for Out, 2 for Transfer, 3 for loan,4 for in debt
    image: { type: String, required: true },
});

const SpendingCategories = mongoose.model(
    "SpendingCategories",
    spendingCategoriesSchema
);

module.exports = SpendingCategories;
