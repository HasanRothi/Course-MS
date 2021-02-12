require('dotenv').config()
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cors = require('cors')
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
const checkAuth = require('./api/middleware/checkAuth')


//api route path
const facultyRouter = require("./api/routes/faculty");
const ccoRouter = require("./api/routes/course");
const courseNotice = require("./api/routes/courseNotice");
const facultyAuth = require("./api/auth/facultyAuth");
const studentInfo = require("./api/routes/testThing");
const chat = require('./api/routes/chat')
const book = require('./api/routes/book')

//connect mongodb atlas
mongoose.connect(
    `mongodb+srv://rothi:${process.env.MONGODB_PASS}@cluster0.xt4sj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
);

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

//api list
app.use("/faculty",checkAuth, facultyRouter);
app.use("/course",checkAuth , ccoRouter);
app.use("/coursenotice", courseNotice);
app.use("/faculty/auth", facultyAuth);
app.use("/student",checkAuth, studentInfo);
app.use("/chat", chat);
app.use("/library", book);

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

//sentry 
Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
  });
module.exports = app;