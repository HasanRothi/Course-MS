const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    author: { type: String, required: true },
    edition: { type: String },
    total: { type: Number, required: true, default: 1 },
    available: { type: Number },
    category: { type: String, required: true },
    students: []
});
module.exports = mongoose.model("book", bookSchema);