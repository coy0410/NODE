var express = require('express');
var router = express.Router();
var database = require('./../database');

//管理员登录入口
router.get('/', function(req, res, next) {
    res.render('adlo', { message: '' })
});

//管理员登录
router.post('/', (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    var query = 'select * from administrator where username =' + database.escape(username) + 'and password=' + database.escape(password);
    database.query(query, function(err, rows, fields) {
        var user = rows[0]
        if (err) throw err;
        if (rows != "") {
            req.session.user = user;
            res.redirect('yess')
        } else {
            res.render('adlo', { message: '用户名或密码错误' });
            return;
        }


    })
});















//管理员注册入口
// router.get('/ad_re', function(req, res, next) {
//     res.render('ad_re')
// });



module.exports = router;