const { default: mongoose } = require("mongoose");
const { SpendingType, LoanActionType } = require("../models/constant");
const LoanDebt = require("../models/loanDebtSchema");
const Spending = require("../models/spendingSchema");
const Wallet = require("../models/walletSchema");
const SpendingCategories = require("../models/spendingCategoriesSchema");

class SpendingServices {
    async createSpending(payload) {
        const spending = new Spending({
            ...payload,
        });
        spending.save();

        const wallet = await Wallet.findOne({
            _id: payload.wallet_id,
        });
        const catagory = await SpendingCategories.findOne({
            _id: payload.category_id,
        });

        if (catagory.type === SpendingType.MoneyIn) {
            wallet.money += payload.money;
            wallet.save();
        } else if (catagory.type === SpendingType.MoneyOut) {
            wallet.money -= payload.money;
            wallet.save();
        } else if (catagory.type === SpendingType.TransferWallet) {
            const toWallet = await Wallet.findOne({
                _id: payload.to_wallet_id,
            });
            wallet.money -= payload.money;
            toWallet.money += payload.money;
            wallet.save();
            toWallet.save();

            const spendingInToWallet = new Spending({
                ...payload,
                description: "Chuyển từ ví " + wallet.name,
                category_id: new mongoose.Types.ObjectId(
                    "65fe8869c7de716bcb26bae5"
                ),
                wallet_id: payload.to_wallet_id,
            });
            spendingInToWallet.save();
        } else if (catagory.type === SpendingType.Borrow) {
            LoanDebt.create({
                ...payload,
                type: LoanActionType.Lending,
            });
        } else if (catagory.type === SpendingType.Lending) {
            LoanDebt.create({
                ...payload,
                type: LoanActionType.Lending,
            });
        } else if (catagory.type === SpendingType.DebtCollection) {
            LoanDebt.create({
                ...payload,
                type: LoanActionType.Lending,
            });
        } else if (catagory.type === SpendingType.RepaymentOfDebt) {
            LoanDebt.create({
                ...payload,
                type: LoanActionType.Lending,
            });
        }
        return { message: "Spending created successfully" };
    }

    async getAllSpending(payload) {
        const spending = await Spending.find({
            wallet_id: payload.wallet_id,
        });
        return spending;
    }
}

const spendingServices = new SpendingServices();
module.exports = spendingServices;
