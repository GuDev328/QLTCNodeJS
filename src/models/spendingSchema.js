const mongoose = require("mongoose");

const spendingSchema = new mongoose.Schema({
    wallet_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    description: { type: String },
    money: { type: Number, required: true },
    SpendingCategories: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    date: { type: String, required: true },
});

const Spending = mongoose.model("Spending", spendingSchema);

module.exports = Spending;
