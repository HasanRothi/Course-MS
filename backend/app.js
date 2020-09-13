const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//api route path
const facultyRouter = require("./api/routes/faculty");
const ccoRouter = require("./api/routes/course");
const courseNotice = require("./api/routes/courseNotice");
const facultyAuth = require("./api/auth/facultyAuth");
const studentInfo = require("./api/routes/testStudent");

//connect mongodb atlas
mongoose.connect(
  "mongodb+srv://rothi:" +
    process.env.MONGO_ATLAS_PASSWORD +
    "@cluster0.xt4sj.mongodb.net/" +
    process.env.DB_NAME +
    "?retryWrites=true&w=majority"
);

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

//Faculty api
app.use("/faculty", facultyRouter);
app.use("/course", ccoRouter);
app.use("/coursenotice", courseNotice);
app.use("/faculty/auth", facultyAuth);
app.use("/student", studentInfo);

//handle error
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
module.exports = app;
