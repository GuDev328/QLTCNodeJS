const { default: mongoose } = require("mongoose");
const { SpendingType, LoanActionType } = require("../models/constant");
const LoanDebt = require("../models/loanDebtSchema");
const Spending = require("../models/spendingSchema");
const Wallet = require("../models/walletSchema");
const SpendingCategories = require("../models/spendingCategoriesSchema");
const { ErrorWithStatus } = require("../utils/errorHandler");
const { exportExcel } = require("../utils/excel");

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
        const wallet = await Wallet.findOne({
            _id: payload.wallet_id,
        });
        if (!wallet) throw new ErrorWithStatus(404, "Ví không tồn tại");
        if (wallet.user_id !== payload.user_id)
            throw new ErrorWithStatus(
                401,
                "Bạn không có quyền truy cập ví này"
            );
        const spending = await Spending.aggregate([
            {
                $match: {
                    wallet_id: payload.wallet_id,
                },
            },
            {
                $lookup: {
                    from: "spendingcategories",
                    localField: "category_id",
                    foreignField: "_id",
                    as: "category",
                },
            },
        ]);
        return spending;
    }

    async exportExcel(payload) {
        const wallet = await Wallet.findOne({
            _id: payload.wallet_id,
        });
        if (!wallet) {
            throw new ErrorWithStatus(404, "Ví không tồn tại");
        }
        if (String(wallet.user_id) !== String(payload.user_id)) {
            throw new ErrorWithStatus(
                401,
                "Bạn không có quyền truy cập ví này"
            );
        }
        const spendings = await Spending.aggregate([
            {
                $match: {
                    wallet_id: payload.wallet_id,
                    date: {
                        $gte: new Date(payload.start_date),
                        $lte: new Date(payload.end_date),
                    },
                },
            },
            {
                $lookup: {
                    from: "spendingcategories",
                    localField: "category_id",
                    foreignField: "_id",
                    as: "category",
                },
            },
            {
                $lookup: {
                    from: "wallets",
                    localField: "wallet_id",
                    foreignField: "_id",
                    as: "wallet",
                },
            },
        ]);

        const dataExcel = [];
        let i = 1;
        spendings.forEach((spending) => {
            dataExcel.push({
                num: i,
                wallet_name: spending.wallet[0].name,
                catagory: spending.category[0].name,
                money: spending.money,
                description: spending.description,
                with_people: spending.with_people,
                date: spending.date,
            });
            i += 1;
        });

        const excelFilePath = await exportExcel(dataExcel);

        return excelFilePath;
    }
}

const spendingServices = new SpendingServices();
module.exports = spendingServices;
