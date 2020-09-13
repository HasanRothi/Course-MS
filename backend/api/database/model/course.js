const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  courseCode: { type: String, required: true, unique: true },
  courseName: { type: String, required: true, unique: true },
  courseCredit: { type: Number, required: true },
  facultyId: { type: String, required: true },
});
module.exports = mongoose.model("course", courseSchema);
