const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    courseCode: { type: String, required: true, unique: true },
    chatList: [{
        userId: String,
        message: String,
        date: { type: String, required: true }
    }],
});
module.exports = mongoose.model("chat", chatSchema);