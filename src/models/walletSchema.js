const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    description: { type: String },
    money: { type: Number, required: true },
    currency: { type: String, required: true },
});

const Wallet = mongoose.model("Wallets", walletSchema);

module.exports = Wallet;
