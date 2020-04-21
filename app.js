const express = require('express');
const path = require('path');
const logger = require('morgan');
const fs = require('fs');
const env = require('dotenv');
const ejs = require('ejs');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const deadlineRouter = require('./routes/deadline');
const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}

const app = express();

app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);
app.use('/deadline', deadlineRouter);

mongoose.connect('mongodb://mongo:27017/docker-docx-au', mongooseOptions, (err)=>{
    if(err) {
        console.log(err);
    }
    else {
        console.log('connected to database !');
    }
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // send error status
    res.status(err.status || 500).send(res.locals.error);
});

module.exports = app;
