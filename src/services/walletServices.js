const { ErrorWithStatus } = require("../utils/errorHandler");
const Wallet = require("../models/walletSchema");
const Spending = require("../models/spendingSchema");

class WalletServices {
    async createWallet(payload) {
        const { name, description, money, currency, user_id } = payload;
        const wallet = new Wallet({
            name,
            description,
            money,
            currency,
            user_id,
        });
        await wallet.save();
        return;
    }

    async deleteWallet(payload) {
        const { wallet_id, user_id } = payload;
        const findWallet = await Wallet.findById(wallet_id);
        if (!findWallet) {
            throw new ErrorWithStatus(404, "Không tìm thấy ví");
        }
        if (findWallet.user_id.toString() !== user_id.toString()) {
            throw new ErrorWithStatus(403, "Không có quyền sửa ví");
        }
        await Wallet.findByIdAndDelete(wallet_id);
        await Spending.deleteMany({ wallet_id });
        return;
    }

    async updateWallet(payload) {
        const { wallet_id, name, description, money, currency, user_id } =
            payload;
        const findWallet = await Wallet.findById(wallet_id);
        if (!findWallet) {
            throw new ErrorWithStatus(404, "Không tìm thấy ví");
        }
        if (findWallet.user_id.toString() !== user_id.toString()) {
            throw new ErrorWithStatus(403, "Không có quyền sửa ví");
        }
        const wallet = await Wallet.findByIdAndUpdate(
            wallet_id,
            {
                name,
                description,
                money,
                currency,
            },
            { new: true }
        );
        return;
    }

    async getAllWallets(payload) {
        const { user_id } = payload;
        const wallets = await Wallet.find({ user_id });
        if (!wallets) {
            throw new ErrorWithStatus(404, "Không tìm thấy ví");
        }
        return wallets;
    }
}

const walletServices = new WalletServices();
module.exports = walletServices;
