const mongoose = require("mongoose");

const arciveSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    description: { type: String, required: true },
    dept: { type: String , required : true},
    link: { type: String, required: true },
    supervisor: { type: String, required: true },
    type: { type: String, required: true },
    students: {type : Array, required: true}
});
module.exports = mongoose.model("archive", arciveSchema);