const { default: mongoose } = require("mongoose");
const spendingServices = require("../services/spendingServices");
const moment = require("moment");
const path = require("path");
const fs = require("fs");

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
            user_id: new mongoose.Types.ObjectId(req.user_id),
            wallet_id: new mongoose.Types.ObjectId(req.body.wallet_id),
        };
        const result = await spendingServices.getAllSpending(payload);
        res.status(201).json({
            result,
            message: "Lấy các giao dịch thành công",
        });
    }

    async exportExcel(req, res) {
        const payload = {
            start_date: moment.utc(req.body.start_date, "DD/MM/YYYY").toDate(),
            end_date: moment.utc(req.body.end_date, "DD/MM/YYYY").toDate(),
            wallet_id: new mongoose.Types.ObjectId(req.body.wallet_id),
            user_id: new mongoose.Types.ObjectId(req.user_id),
        };
        const result = await spendingServices.exportExcel(payload);
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=" + path.basename(result)
        );

        const fileStream = fs.createReadStream(result);
        fileStream.pipe(res);
        fileStream.on("close", () => {
            fs.unlink(result, (err) => {
                if (err) {
                    console.error("Error deleting file:", err);
                }
            });
        });
    }
}

const spendingController = new SpendingController();
module.exports = spendingController;
