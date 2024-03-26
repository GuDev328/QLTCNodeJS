const mongoose = require("mongoose");

const loanDebtSchema = new mongoose.Schema({
    wallet_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    with_people: { type: String, required: true },
    money: { type: Number, required: true },
    type: { type: Number, required: true },
    date: { type: Date, required: true },
});

const LoanDebt = mongoose.model("LoanDebts", loanDebtSchema);

module.exports = LoanDebt;
