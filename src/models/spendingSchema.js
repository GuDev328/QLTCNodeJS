const mongoose = require("mongoose");

const spendingSchema = new mongoose.Schema({
    wallet_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    description: { type: String },
    money: { type: Number, required: true },
    with_people: { type: String, required: false },
    to_wallet_id: { type: mongoose.Schema.Types.ObjectId, required: false },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "SpendingCategories",
    },
    date: { type: Date, required: true },
});

const Spending = mongoose.model("Spending", spendingSchema);

module.exports = Spending;
