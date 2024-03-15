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
        req.session.loggedIn = true;
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
}

const userController = new UserController();
module.exports = userController;
