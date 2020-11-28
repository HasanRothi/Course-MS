const mongoose = require("mongoose");
require("mongoose-type-email");
const teststudentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    dept: { type: String, required: true },
    password: { type: String, required: true, minlength: 5, maxlength: 12 },
    phone: { type: String, required: true },
    mail: { type: mongoose.Schema.Types.Email, required: true },
    courseList: [{
        courseInfo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "course",
        },
    }, ],
});
module.exports = mongoose.model("teststudent", teststudentSchema);