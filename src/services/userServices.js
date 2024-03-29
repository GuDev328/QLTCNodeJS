const bcrypt = require("bcrypt");
const moment = require("moment");
const { ErrorWithStatus } = require("../utils/errorHandler");
const User = require("../models/userSchema");
const { sendEmailForgotPassword } = require("../utils/email");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
require("dotenv").config();

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
        const {
            name,
            email,
            password,
            phone_number,
            birthday,
            gender,
            address,
        } = payload;
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
            address,
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

    async getOauthGoogleToken(code) {
        const body = {
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI,
            grant_type: "authorization_code",
        };
        const { data } = await axios.post(
            "https://oauth2.googleapis.com/token",
            body,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );
        return data;
    }

    async getGoogleUserInfo(access_token, id_token) {
        const { data } = await axios.get(
            "https://www.googleapis.com/oauth2/v1/userinfo",
            {
                params: {
                    access_token,
                    alt: "json",
                },
                headers: {
                    Authorization: `Bearer ${id_token}`,
                },
            }
        );
        return data;
    }

    async loginGoogle(code) {
        const oauthGoogleToken = await this.getOauthGoogleToken(code);
        const googleUserInfo = await this.getGoogleUserInfo(
            oauthGoogleToken.access_token,
            oauthGoogleToken.id_token
        );
        if (!googleUserInfo.verified_email) {
            throw new ErrorWithStatus(401, "Email này chưa xác thực");
        }
        console.log(googleUserInfo);
        const userInDb = await User.findOne({ email: googleUserInfo.email });
        if (userInDb) {
            return userInDb;
        } else {
            const password = await this.hashPassword(uuidv4());
            const user = await User.create({
                name: googleUserInfo.name,
                email: googleUserInfo.email,
                password: password,
                phone_number: "Chưa có số điện thoại",
                birthday: new Date(),
                address: "Chưa có địa chỉ",
                gender: 1,
                avatar: googleUserInfo.picture,
            });
            return user;
        }
    }

    async forgotPassword(payload) {
        const { email } = payload;
        const token = uuidv4() + uuidv4() + uuidv4() + uuidv4();
        const user = await User.findOne({ email });
        if (!user) {
            throw new ErrorWithStatus(404, "Không tìm thấy tài khoản");
        }
        user.token_reset_password = token;
        await user.save();
        const sendData = {
            receiverEmail: email,
            token,
        };
        sendEmailForgotPassword(sendData);
        return;
    }

    async resetPassword(payload) {
        const { email, password, token } = payload;
        const user = await User.findOne({ email });
        if (!user) throw new ErrorWithStatus(404, "Không tìm thấy tài khoản");
        if (user.token_reset_password !== token)
            throw new ErrorWithStatus(401, "Token không hợp lệ");
        const hashPassword = await this.hashPassword(password);
        user.password = hashPassword;
        user.token_reset_password = null;
        await user.save();
        return;
    }

    async getAllUser() {
        const users = await User.find(
            {},
            "-__v password -token_reset_password "
        );
        return users;
    }

    async updateProfile(payload) {
        const user = await User.findByIdAndUpdate(payload.user_id, payload, {
            new: true,
        });
        if (!user) throw new ErrorWithStatus(404, "Không tìm thấy tài khoản");
        return user;
    }
}

const userService = new UserService();

module.exports = userService;
