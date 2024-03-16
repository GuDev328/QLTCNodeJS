const { default: mongoose } = require("mongoose");
const walletServices = require("../services/walletServices");

class WalletController {
    async createWallet(req, res) {
        const payload = {
            user_id: new mongoose.Types.ObjectId(req.body.user_id),
            name: req.body.name,
            description: req.body.description,
            money: req.body.money,
            currency: req.body.currency,
        };
        await walletServices.createWallet(payload);
        res.status(200).json({
            message: "Tạo ví thành công",
        });
    }

    async deleteWallet(req, res) {
        const payload = {
            wallet_id: new mongoose.Types.ObjectId(req.body.wallet_id),
            user_id: new mongoose.Types.ObjectId(req.body.user_id),
        };
        await walletServices.deleteWallet(payload);
        res.status(200).json({
            message: "Xóa ví thành công",
        });
    }

    async updateWallet(req, res) {
        const payload = {
            wallet_id: new mongoose.Types.ObjectId(req.body.wallet_id),
            user_id: new mongoose.Types.ObjectId(req.body.user_id),
            name: req.body.name,
            description: req.body.description,
            money: req.body.money,
            currency: req.body.currency,
        };
        await walletServices.updateWallet(payload);
        res.status(200).json({
            message: "Cập nhật ví thành công",
        });
    }

    async getAllWallet(req, res) {
        const payload = {
            user_id: new mongoose.Types.ObjectId(req.body.user_id),
        };
        const result = await walletServices.getAllWallets(payload);
        res.status(200).json({
            result,
            message: "Lấy tất cả ví thành công",
        });
    }
}

const walletController = new WalletController();
module.exports = walletController;
