const nodemailer = require("nodemailer");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

let sendEmailForgotPassword = async (sendData) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    let subjectContent = "Xác nhận quên mật khẩu tài khoản";
    let htmlContent = fs.readFileSync(
        path.resolve("src/templates/forgotPassword.html"),
        "utf8"
    );
    const link = `http://127.0.0.1:5500/reset-password?token=${sendData.token}&email=${sendData.receiverEmail}`;
    htmlContent.replace("{{hrefResetPass}}", link);

    try {
        let info = await transporter.sendMail({
            from: '"Quản lý tài chính cá nhân" <qltccanhan@gmail.com>.com>',
            to: sendData.receiverEmail,
            subject: subjectContent,
            html: htmlContent,
        });
    } catch (error) {}
};

module.exports = {
    sendEmailForgotPassword,
};
