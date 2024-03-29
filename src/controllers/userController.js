const { default: axios } = require("axios");
const userService = require("../services/userServices");
const { listProvinces, listIcons } = require("../list/list");
const { default: mongoose } = require("mongoose");
const moment = require("moment");

class UserController {
    async register(req, res) {
        const payload = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone_number: req.body.phone_number,
            address: req.body.address,
            birthday: req.body.birthday,
            gender: req.body.gender,
        };
        const result = await userService.register(payload);
        res.status(200).json({
            message: "Đăng ký thành công",
        });
    }

    async login(req, res) {
        const payload = {
            email: req.body.email,
            password: req.body.password,
        };
        const result = await userService.login(payload);
        req.session.userId = result._id;
        res.status(200).json({
            result,
            message: "Đăng nhập thành công",
        });
    }
    async logout(req, res) {
        req.session.destroy();
        res.status(200).json({
            message: "Đăng xuất thành công",
        });
    }

    async loginGoogle(req, res) {
        const { code } = req.query;
        const result = await userService.loginGoogle(code);
        req.session.userId = result._id;
        const redirectUrl = `${process.env.CLIENT_REDIRECT_CALLBACK}/id=${result._id}&name=${result.name}&email=${result.email}&phone_number=${result.phone_number}&birthday=${result.birthday}&gender=${result.gender}&avatar=${result.avatar}&address=${result.address}`;
        res.redirect(redirectUrl);
    }

    async forgotPassword(req, res) {
        const payload = {
            email: req.body.email,
        };
        const result = await userService.forgotPassword(payload);
        res.status(200).json({
            message: "Gửi email thành công",
        });
    }

    async resetPassword(req, res) {
        const payload = {
            email: req.body.email,
            token: req.body.token,
            password: req.body.password,
        };
        const result = await userService.resetPassword(payload);
        res.status(200).json({
            message: "Khôi phục mật khẩu thành công",
        });
    }

    async getAllUser(req, res) {
        const result = await userService.getAllUser();
        res.status(200).json({
            result,
            message: "Lấy danh sách người dùng thành công",
        });
    }

    async getListProvince(req, res) {
        res.status(200).json({
            result: {
                province: listProvinces,
            },
            message: "Lấy danh sách tỉnh thành thành công",
        });
    }

    async getListIcon(req, res) {
        res.status(200).json({
            result: {
                icons: listIcons,
            },
            message: "Lấy danh sách icon thành thành công",
        });
    }

    async updateProfile(req, res) {
        const payload = {
            user_id: new mongooseTypes.ObjectId(req.user_id),
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone_number: req.body.phone_number,
            address: req.body.address,
            birthday: moment.utc(req.body.birthday, "DD/MM/YYYY").toDate(),
            gender: req.body.gender,
            avatar: req.body.avatar,
        };
        const result = await userService.updateProfile(payload);
        res.status(200).json({
            result,
            message: "Cập nhật thông tin thành công",
        });
    }
}

const userController = new UserController();
module.exports = userController;
