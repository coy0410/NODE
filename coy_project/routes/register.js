var express = require('express');
var router = express.Router();
var User = require('./bean/user');
var database = require('../database')


/* 注册页面 */
router.get('/', function(req, res, next) {
    res.render('register', { message: '' });
});

//注册1
// router.post('/', (req, res, next) => {
//     var username = req.body.username;
//     var password = req.body.password;
//     var re_password = req.body.re_password;
//     var str = "insert into author (id,username,password,re_password) values(0,?,?,?)";
//     database.query(str, [username, password, re_password], (err, results) => {
//         if (err) {
//             res.json(err);
//             if (password != re_password) {
//                 res.send("注册失败，两次输入的密码不同")
//             }
//         } else {
//             console.log(results);
//             res.redirect('page')
//         }

//     })
// });


//注册2
// router.post('/', (req, res, next) => {
//     var body = req.body
//     var user = new User(body.username, body.password, body.re_password)
//     var str = 'insert into author (username,password,re_password) values(" ' + user.username + '"," ' + user.password + '"," ' + user.re_password + '")';
//     database.query(str, (err, results) => {
//         if (err) throw err;
//         console.log(results);
//         console.log(user);
//         res.redirect('page')

//     })
// })

//注册3
router.post('/', (req, res, next) => {
    var body = req.body
    var user = new User(body.username, body.password, body.re_password)
    var str1 = 'insert into author (username,password,re_password) values("' + user.username + '", "' + user.password + '", "' + user.re_password + '")'; //添加数据
    var str2 = 'SELECT * FROM author'; //查询数据
    database.query(str2, (err, results) => {
        if (err) throw err;
        if (body.username == '' && body.password == '') {
            res.render('register', { message: '用户名和密码不能为空' });
            return;
        }
        if (body.password != body.re_password) {
            res.render('register', { message: '两次输入的密码不一致' });
            return;
        } else {
            var ta = true;
            results.forEach(item => {
                if (item.username == body.username && item.password == body.password && item.re_password == body.re_password) {
                    res.render('register', { message: '该用户已存在' });
                    ta = false;
                    return;
                }

            });
            if (ta) {
                database.query(str1, (err, results) => {
                    if (err) throw err;
                    // console.log(results);
                    // console.log(user);
                    res.redirect('yeah')

                })

            }
        }
    });


})


module.exports = router;