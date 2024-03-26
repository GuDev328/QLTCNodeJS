const { default: mongoose } = require("mongoose");
const spendingServices = require("../services/spendingServices");
const moment = require("moment");

class SpendingController {
    async createSpending(req, res) {
        const payload = {
            wallet_id: new mongoose.Types.ObjectId(req.body.wallet_id),
            description: req.body.description,
            with_people: req.body.with_people ? req.body.with_people : "",
            money: req.body.money,
            to_wallet_id: req.body.to_wallet_id
                ? new mongoose.Types.ObjectId(req.body.to_wallet_id)
                : null,
            category_id: new mongoose.Types.ObjectId(req.body.category_id),
            date: moment.utc(req.body.date, "DD/MM/YYYY").toDate(),
        };
        const result = await spendingServices.createSpending(payload);
        res.status(201).json({
            message: "Tạo giao dịch thành công",
        });
    }

    async getAllSpending(req, res) {
        const payload = {
            wallet_id: new mongoose.Types.ObjectId(req.body.wallet_id),
        };
        const result = await spendingServices.getAllSpending(payload);
        res.status(201).json({
            result,
            message: "Lấy các giao dịch thành công",
        });
    }
}

const spendingController = new SpendingController();
module.exports = spendingController;
