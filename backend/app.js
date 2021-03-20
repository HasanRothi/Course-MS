require('dotenv').config()
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require('cors')
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
const checkAuth = require('./api/middleware/checkAuth')
const logger = require('./config/logger')
require('./config/database')


//api route path
const facultyRouter = require("./api/routes/faculty");
const ccoRouter = require("./api/routes/course");
const courseNotice = require("./api/routes/courseNotice");
const facultyAuth = require("./api/auth/facultyAuth");
const studentInfo = require("./api/routes/testThing");
const chat = require('./api/routes/chat')
const book = require('./api/routes/book')
const archive = require('./api/routes/archive')

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use( (req, res, done) => {
    // logger.info(new Date(),req.method,'info',req.originalUrl);
    // logger.info({
    //     timestamp: new Date().toDateString(),
    //     method: req.method,
    //     level: 'info',
    //     path: req.originalUrl
    // })
    logger.info(`[${new Date().toLocaleString()} / ${req.method}] : ${req.originalUrl}`)
    done();
});
//api list
app.use("/faculty", facultyRouter);
app.use("/course", ccoRouter);
app.use("/coursenotice", courseNotice);
app.use("/faculty/auth", facultyAuth);
app.use("/student", studentInfo);
app.use("/chat", chat);
app.use("/library", book);
app.use("/archive", archive);

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