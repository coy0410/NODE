var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var projectRouter = require('./routes/project');
var pageRouter = require('./routes/page');
var registerRouter = require('./routes/register');
var backRouter = require('./routes/back');
var adloRouter = require('./routes/adlo');
var logoutRouter = require('./routes/logout');
var logout2Router = require('./routes/logout2');







var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser("coy"));
//express中间件，express配置
app.use(session({
    secret: "coy", //加盐
    resave: 'false', //是否强制保存
    cookie: {
        maxAge: 24 * 60 * 1000
    }, //设置有效期
    saveUninitialized: 'true' //是否保存初始化的session值
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/project', projectRouter);
app.use('/page', pageRouter);
app.use('/register', registerRouter);
app.use('/back', backRouter);
app.use('/adlo', adloRouter);
app.use('/logout', logoutRouter);
app.use('/logout2', logout2Router);







// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.render('404');
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;