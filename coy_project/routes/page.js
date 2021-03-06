var express = require('express');
const { render } = require('../app');
var router = express.Router();
var crypto = require('crypto');
var database = require('../database')
    // var User = require('./bean/user');

/* 登录页. */
router.get('/', function(req, res, next) {
    res.render('page', { message: '' });
});

//登录
router.post('/', (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    // var hash = crypto.createHash('md5');
    // hash.update(password);
    // password = hash.digest('hex');
    var query = 'select * from author where username =' + database.escape(username) + 'and password=' + database.escape(password);
    database.query(query, function(err, rows, fields) {
        var user = rows[0]
        if (err) throw err;
        if (rows != "") {
            req.session.user = user;
            res.redirect('/yes')
        }
        if (username == "" && password == "") {
            res.render('page', { message: '用户名和密码不能为空' });
        } else {
            console.log(user);
            res.render('page', { message: '用户名或密码错误' });
            return;
        }


    })
});

module.exports = router;