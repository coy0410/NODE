var express = require('express');
var router = express.Router();
var database = require('../database');


//后台用户管理
router.get('/', function(req, res, next) {
    var strsel = 'select * from administrator';
    database.query(strsel, (err, rows) => {
        res.render('back', { data: rows });
    })
});























//管理员登录
router.post('/', (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    var query = 'select * from administrator where username =' + database.escape(username) + 'and password=' + database.escape(password);
    database.query(query, function(err, rows, fields) {
        if (err) throw err;
        if (rows != "") {
            res.redirect('/back')
        } else {
            res.send('登录失败，请重新操作！')
        }


    })
});

//管理员注册
router.post('/', (req, res, next) => {
    var body = req.body
    var user = new User(body.username, body.password, body.re_password)
    var str1 = 'insert into administrator (username,password,re_password) values(" ' + user.username + '"," ' + user.password + '"," ' + user.re_password + '")'; //添加数据
    var str2 = 'SELECT * FROM administrator'; //查询数据
    database.query(str2, (err, results) => {
        if (err) throw err;
        if (body.password != body.re_password) {
            res.send('注册失败，两次输入的密码不同！')
        } else {
            var ta = true;
            results.forEach(item => {
                if (item.username == body.username && item.password == body.password && item.re_password == body.re_password) {
                    res.send('注册失败，该用户已存在！')
                    ta = false;
                    return;
                }
            });
            if (ta) {
                database.query(str1, (err, results) => {
                    if (err) throw err;
                    console.log(results);
                    console.log(user);
                    res.redirect('/ad_lo')
                })
            }
        }
    });
})

module.exports = router;