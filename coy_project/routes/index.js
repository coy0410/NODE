var express = require('express');
var router = express.Router();
var database = require('./../database');
var User = require('./bean/user');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

//主页
//圈子
router.get('/friends', function(req, res, next) {
    res.render('friends')
});

//简介
router.get('/about', function(req, res, next) {
    res.render('about')
});

//旅行
router.get('/tracks', function(req, res, next) {
    res.render('tracks')
});

//博客
router.get('/blog', function(req, res, next) {
    var query = 'SELECT * FROM  article ORDER BY  articleID DESC';
    database.query(query, function(err, rows, fields) {
        var articles = rows;
        articles.forEach(function(ele) {
            var year = ele.articleTime.getFullYear();
            var month = ele.articleTime.getMonth() + 1 > 10 ? ele.articleTime.getMonth() : '0' + (ele.articleTime.getMonth() + 1);
            var date = ele.articleTime.getDate() > 10 ? ele.articleTime.getDate() : '0' + ele.articleTime.getDate();
            ele.articleTime = year + '-' + month + '-' + date;
        });
        res.render("blog", { articles: articles });
    });
});



















//影视
router.get('/video', function(req, res, next) {
    res.render('video')
});




//后台管理
//用户管理(功能)
router.get('/author', function(req, res, next) {
    var strsel = "select * from author";
    database.query(strsel, (err, rows) => {
        res.render('author', { data: rows });
    })
});

//查询





//评论管理
router.get('/sayings', function(req, res, next) {
    res.render('sayings')
});

//用户列表
router.get('/admin', function(req, res, next) {
    res.render('admin')
});


//登录成功
router.get('/yes', function(req, res, next) {
    res.render('yes')
});

//登录失败
router.get('/no', function(req, res, next) {
    res.render('no')
});

//注册成功
router.get('/yeah', function(req, res, next) {
    res.render('yeah')
});

//注册失败：两次密码不一致
router.get('/non1', function(req, res, next) {
    res.render('non1')
});

//注册失败：用户已存在
router.get('/non2', function(req, res, next) {
    res.render('non2')
});

//管理员登录入口
router.get('/ad_lo', function(req, res, next) {
    res.render('ad_lo')
});

//管理员注册入口
router.get('/ad_re', function(req, res, next) {
    res.render('ad_re')
});



//功能
//新增
router.get('/add', function(req, res, next) {
    res.render('add')
})

router.post('/add', (req, res) => {
    var strins = 'insert into author(username, password, re_password) values(?,?,?)';
    database.query(strins, [req.body.username, req.body.password, req.body.password], (err, rows) => {
        console.log(err);
        console.log(rows);
        res.redirect('/author')
    })
})

//编辑
router.get('/edit', function(req, res, next) {
    if (req.query.id != undefined) {
        var strsel = 'select * from author where id = ?';
        database.query(strsel, [req.query.id], (err, row) => {
            res.render('edit', { row: row[0] });
        })
    }
})

router.post('/edit', (req, res) => {
    var body = req.body
    var user1 = new User(body.username, body.password)
    var strupd = 'update author set username = ' + user1.username + ',password = ' + user1.password + ' where id = ?';
    database.query(strupd, [req.body.id], (err, rows) => {
        console.log(err);
        console.log(rows);
        res.redirect('/author')

    })
})

//删除
router.get('/del', function(req, res, next) {
    if (req.query.id != undefined) {
        var strdel = 'select * from author where id = ?';
        database.query(strdel, [req.query.id], (err, row) => {
            res.render('del', { row: row[0] });
        })
    }
})

router.post('/del', (req, res) => {
    var strdel = 'delete from author where id = ?';
    database.query(strdel, [req.body.id], (err, rows) => {
        console.log(err);
        console.log(rows);
        res.redirect('/author')

    })
})








module.exports = router;