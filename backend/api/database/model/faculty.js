const mongoose = require("mongoose");
require("mongoose-type-email");
const facultySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    dept: { type: String, required: true },
    password: { type: String, required: true, minlength: 8, maxlength: 12 },
    phone: { type: String, required: true },
    mail: { type: mongoose.Schema.Types.Email, required: true },
});
module.exports = mongoose.model("faculty", facultySchema);