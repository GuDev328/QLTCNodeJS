const bcrypt = require("bcrypt");
const moment = require("moment");
const { ErrorWithStatus } = require("../utils/errorHandler");
const User = require("../models/userSchema");

class UserService {
    async hashPassword(password) {
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);
        return hashPassword;
    }

    async comparePassword(password, hashPassword) {
        const isMatch = await bcrypt.compare(password, hashPassword);
        return isMatch;
    }

    async register(payload) {
        const { name, email, password, phone_number, birthday, gender } =
            payload;
        const findUser = await User.findOne({ email });
        if (findUser) {
            throw new ErrorWithStatus(409, "Email đã tồn tại");
        }

        const hashPassword = await this.hashPassword(password);
        const user = new User({
            name,
            email,
            password: hashPassword,
            phone_number,
            birthday: moment.utc(birthday, "DD/MM/YYYY").toDate(),
            gender,
        });
        await user.save();
        return;
    }

    async login(payload) {
        const { email, password } = payload;
        const user = await User.findOne({ email }, "-__v");
        if (!user) {
            throw new ErrorWithStatus(404, "Không tìm thấy tài khoản");
        }
        const isMatch = await this.comparePassword(password, user.password);
        if (!isMatch) {
            throw new ErrorWithStatus(401, "Mật khẩu không đúng");
        }

        return user;
    }
}

const userService = new UserService();

module.exports = userService;
