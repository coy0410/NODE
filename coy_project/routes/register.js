var express = require('express');
var router = express.Router();
// var User = require('../modules/user.js')
var database = require('../database')


/* 注册页面 */
router.get('/', function(req, res, next) {
    res.render('register', { errMsg: "" });
});

//注册
router.post('/', (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    var re_password = req.body.re_password;
    var str = "insert into author (id,username,password,re_password) values(0,?,?,?)";
    database.query(str, [username, password, re_password], (err, results) => {
        if (err) {
            res.json(err);
            if (password != re_password) {
                res.send("注册失败，两次输入的密码不同")
            }
        } else {
            console.log(results);
            res.redirect('page')
        }

    })
});


module.exports = router;