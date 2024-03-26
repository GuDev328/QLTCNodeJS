const { default: axios } = require("axios");
const userService = require("../services/userServices");

class UserController {
    async register(req, res) {
        const payload = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone_number: req.body.phone_number,
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
                province: [
                    { idProvince: "01", name: "Thành phố Hà Nội" },
                    { idProvince: "79", name: "Thành phố Hồ Chí Minh" },
                    { idProvince: "31", name: "Thành phố Hải Phòng" },
                    { idProvince: "48", name: "Thành phố Đà Nẵng" },
                    { idProvince: "92", name: "Thành phố Cần Thơ" },
                    { idProvince: "02", name: "Tỉnh Hà Giang" },
                    { idProvince: "04", name: "Tỉnh Cao Bằng" },
                    { idProvince: "06", name: "Tỉnh Bắc Kạn" },
                    { idProvince: "08", name: "Tỉnh Tuyên Quang" },
                    { idProvince: "10", name: "Tỉnh Lào Cai" },
                    { idProvince: "11", name: "Tỉnh Điện Biên" },
                    { idProvince: "12", name: "Tỉnh Lai Châu" },
                    { idProvince: "14", name: "Tỉnh Sơn La" },
                    { idProvince: "15", name: "Tỉnh Yên Bái" },
                    { idProvince: "17", name: "Tỉnh Hoà Bình" },
                    { idProvince: "19", name: "Tỉnh Thái Nguyên" },
                    { idProvince: "20", name: "Tỉnh Lạng Sơn" },
                    { idProvince: "22", name: "Tỉnh Quảng Ninh" },
                    { idProvince: "24", name: "Tỉnh Bắc Giang" },
                    { idProvince: "25", name: "Tỉnh Phú Thọ" },
                    { idProvince: "26", name: "Tỉnh Vĩnh Phúc" },
                    { idProvince: "27", name: "Tỉnh Bắc Ninh" },
                    { idProvince: "30", name: "Tỉnh Hải Dương" },
                    { idProvince: "33", name: "Tỉnh Hưng Yên" },
                    { idProvince: "34", name: "Tỉnh Thái Bình" },
                    { idProvince: "35", name: "Tỉnh Hà Nam" },
                    { idProvince: "36", name: "Tỉnh Nam Định" },
                    { idProvince: "37", name: "Tỉnh Ninh Bình" },
                    { idProvince: "38", name: "Tỉnh Thanh Hóa" },
                    { idProvince: "40", name: "Tỉnh Nghệ An" },
                    { idProvince: "42", name: "Tỉnh Hà Tĩnh" },
                    { idProvince: "44", name: "Tỉnh Quảng Bình" },
                    { idProvince: "45", name: "Tỉnh Quảng Trị" },
                    { idProvince: "46", name: "Tỉnh Thừa Thiên Huế" },
                    { idProvince: "49", name: "Tỉnh Quảng Nam" },
                    { idProvince: "51", name: "Tỉnh Quảng Ngãi" },
                    { idProvince: "52", name: "Tỉnh Bình Định" },
                    { idProvince: "54", name: "Tỉnh Phú Yên" },
                    { idProvince: "56", name: "Tỉnh Khánh Hòa" },
                    { idProvince: "58", name: "Tỉnh Ninh Thuận" },
                    { idProvince: "60", name: "Tỉnh Bình Thuận" },
                    { idProvince: "62", name: "Tỉnh Kon Tum" },
                    { idProvince: "64", name: "Tỉnh Gia Lai" },
                    { idProvince: "66", name: "Tỉnh Đắk Lắk" },
                    { idProvince: "67", name: "Tỉnh Đắk Nông" },
                    { idProvince: "68", name: "Tỉnh Lâm Đồng" },
                    { idProvince: "70", name: "Tỉnh Bình Phước" },
                    { idProvince: "72", name: "Tỉnh Tây Ninh" },
                    { idProvince: "74", name: "Tỉnh Bình Dương" },
                    { idProvince: "75", name: "Tỉnh Đồng Nai" },
                    { idProvince: "77", name: "Tỉnh Bà Rịa - Vũng Tàu" },
                    { idProvince: "80", name: "Tỉnh Long An" },
                    { idProvince: "82", name: "Tỉnh Tiền Giang" },
                    { idProvince: "83", name: "Tỉnh Bến Tre" },
                    { idProvince: "84", name: "Tỉnh Trà Vinh" },
                    { idProvince: "86", name: "Tỉnh Vĩnh Long" },
                    { idProvince: "87", name: "Tỉnh Đồng Tháp" },
                    { idProvince: "89", name: "Tỉnh An Giang" },
                    { idProvince: "91", name: "Tỉnh Kiên Giang" },
                    { idProvince: "93", name: "Tỉnh Hậu Giang" },
                    { idProvince: "94", name: "Tỉnh Sóc Trăng" },
                    { idProvince: "95", name: "Tỉnh Bạc Liêu" },
                    { idProvince: "96", name: "Tỉnh Cà Mau" },
                ].sort((a, b) => a.name.localeCompare(b.name)),
            },
            message: "Lấy danh sách tỉnh thành thành công",
        });
    }
}

const userController = new UserController();
module.exports = userController;
