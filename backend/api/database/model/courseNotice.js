const mongoose = require("mongoose");

const courseNoticeSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  noticeTitle: { type: String, required: true },
  noticeDetails: { type: String, required: true },
  courseCode: { type: String, required: true },
  facultyId: { type: String, required: true },
  date: { type: Date, required: true },
});
module.exports = mongoose.model("courseNotice", courseNoticeSchema);
