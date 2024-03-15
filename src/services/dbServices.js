const mongoose = require("mongoose");
const { config } = require("dotenv");
config();

class DbService {
    constructor() {
        this.dbURI = process.env.DB_URI;
    }

    connect() {
        mongoose.connect(this.dbURI);

        mongoose.connection.on("connected", () => {
            console.log("Kết nối đến MongoDB thành công");
        });

        mongoose.connection.on("error", (err) => {
            console.error("Lỗi kết nối đến MongoDB: ", err);
        });

        mongoose.connection.on("disconnected", () => {
            console.log("Đã ngắt kết nối đến MongoDB");
        });

        process.on("SIGINT", () => {
            mongoose.connection.close(() => {
                console.log("Ứng dụng đã kết thúc, đóng kết nối đến MongoDB");
                process.exit(0);
            });
        });
    }
}

const db = new DbService();

module.exports = db;
