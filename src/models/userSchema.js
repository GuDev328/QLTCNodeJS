const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone_number: { type: String, required: true },
    birthday: { type: Date, required: true },
    gender: { type: Number, required: true }, // 1 for male, 0 for female
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
