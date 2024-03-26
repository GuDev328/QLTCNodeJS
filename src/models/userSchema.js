const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    isAdmin: { type: Boolean, required: false, default: false },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    token_reset_password: { type: String, required: false, default: null },
    phone_number: { type: String, required: true },
    birthday: { type: Date, required: true },
    address: { type: String, required: true },
    gender: { type: Number, required: true }, // 1 for male, 0 for female
    avatar: { type: String, required: false, default: null },
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
