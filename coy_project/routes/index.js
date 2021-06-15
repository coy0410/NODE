var express = require('express');
var router = express.Router();
var database = require('./../database');
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');
var User = require('./bean/user');
var User2 = require('./bean/user2');
var User3 = require('./bean/user3');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

//主页
//圈子
router.get('/circle', function(req, res, next) {
    res.render('circle')
});

//简介
router.get('/introduce', function(req, res, next) {
    var strsel = "select * from introduce";
    database.query(strsel, (err, rows) => {
        res.render('introduce', { data: rows });
    })
});

//旅行
router.get('/tracks', function(req, res, next) {
    res.render('tracks')
});


//博客(主页)
router.get('/blog', function(req, res, next) {
    var query = 'SELECT * FROM  article ORDER BY  articleID DESC';
    database.query(query, function(err, rows, fields) {
        var articles = rows;
        //修改国际时间，美化时间
        articles.forEach(function(ele) {
            var year = ele.articleTime.getFullYear();
            var month = ele.articleTime.getMonth() + 1 > 10 ? ele.articleTime.getMonth() : '0' + (ele.articleTime.getMonth() + 1);
            var date = ele.articleTime.getDate() > 10 ? ele.articleTime.getDate() : '0' + ele.articleTime.getDate();
            ele.articleTime = year + '-' + month + '-' + date;
        });
        res.render("blog", { articles: articles });
    });
});

//文章内容页
router.get('/articles/:articleID', (req, res, next) => {
    var articleID = req.params.articleID;
    var query = 'SELECT * FROM article WHERE articleID =' + database.escape(articleID);
    database.query(query, (err, rows, fields) => {
        if (err) {
            console.log(err);
            return;
        }
        var query = 'UPDATE article SET articleClick = articleClick+1 WHERE articleID =' + database.escape(articleID);
        var article = rows[0];
        database.query(query, (err, rows, fields) => {
            if (err) {
                console.log(err);
                return;
            }
        })
        var year = article.articleTime.getFullYear();
        var month = article.articleTime.getMonth() + 1 > 10 ? article.articleTime.getMonth() : '0' + (article.articleTime.getMonth() + 1);
        var date = article.articleTime.getDate() > 10 ? article.articleTime.getDate() : '0' + article.articleTime.getDate();
        article.articleTime = year + '-' + month + '-' + date;
        res.render('article', { article: article });
    });
});

//写文章页面
router.get('/write', (req, res, next) => {
    var user = req.session.user;
    if (!user) {
        res.render('page', { message: '尚未登录，请登录后操作' });
        return;
    }
    res.render('write');
})

router.post('/write', ((req, res, next) => {
    var title = req.body.title;
    var content = req.body.content;
    var authorName = req.session.user.username;
    var query = 'INSERT article SET articleTitle=' + database.escape(title) + ',articleAuthor=' + database.escape(authorName) + ',articleContent=' + database.escape(content) + ',articleTime=CURDATE()';
    database.query(query, (err, rows, fields) => {
        if (err) {
            console.log(err);
            return;
        }
        res.redirect('/blog');
    })
}))

//友情链接
router.get('/friends', (req, res, next) => {
    res.render('friends');
})

//关于博客
router.get('/about', (req, res, next) => {
    res.render('about');
})

//修改博客文章
router.get('/modify/:articleID', (req, res, next) => {
    var articleID = req.params.articleID;
    var user = req.session.user;
    var query = 'SELECT * FROM article WHERE articleID=' + database.escape(articleID);
    if (!user) {
        res.render('page', { message: '尚未登录，请登录后操作' });
        return;
    }
    database.query(query, (err, rows, fields) => {
        if (err) {
            console.log(err);
            return;
        }
        var article = rows[0];
        var content = article.articleContent;
        var title = article.articleTitle;
        res.render('modify', { user: user, title: title, content: content });
    });
});

router.post('/modify/:articleID', (req, res, next) => {
    var user = req.session.user;
    var articleID = req.params.articleID;
    var title = req.body.title;
    var content = req.body.content;
    var query = 'UPDATE article SET articleTitle=' + database.escape(title) + ',articleContent=' + database.escape(content) + 'WHERE articleID=' + database.escape(articleID);
    database.query(query, (err, rows, fields) => {
        if (err) {
            console.log(err);
            return;
        }
        res.redirect('/blog');
    });
});

//删除博客文章
router.get('/delete/:articleID', (req, res, next) => {
    let articleID = req.params.articleID;
    let user = req.session.user;
    let query = 'DELETE FROM article WHERE articleID=' + database.escape(articleID);
    if (!user) {
        res.render('page', { message: '尚未登录，请登录后操作' });
        return;
    }
    database.query(query, (err, rows, fields) => {
        res.redirect('/blog');
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
//用户查询
router.post('/author', function(req, res) {
    var user = req.session.user;
    if (!user) {
        res.render('adlo', { message: '尚未登录，请管理员登录后操作 ' });
        return;
    }
    var strsel1 = 'select * from author where username regexp "' + req.body.searchValue + '"';
    database.query(strsel1, (err, rows) => {
        if (err) {
            throw err
        }
        if (rows) {
            res.json({ rows: rows })

        }
    })
})






//简介管理
router.get('/introBack', function(req, res, next) {
    var strsel = "select * from introduce";
    database.query(strsel, (err, rows) => {
        res.render('introBack', { data: rows });
    })
});
//简介查询
router.post('/introBack', function(req, res) {
    var user = req.session.user;
    if (!user) {
        res.render('adlo', { message: '尚未登录，请管理员登录后操作 ' });
        return;
    }
    var strsel1 = 'select * from introduce where title regexp "' + req.body.searchValue + '"';
    database.query(strsel1, (err, rows) => {
        if (err) {
            throw err
        }
        if (rows) {
            res.json({ rows: rows })
        }
    })
})


//简介新增
router.get('/add1', function(req, res, next) {
    res.render('add1')
})

router.post('/add1', (req, res) => {
    var user = req.session.user;
    if (!user) {
        res.render('adlo', { message: '尚未登录，请管理员登录后操作 ' });
        return;
    }
    var strins = 'insert into introduce(title,content) values(?,?)';
    database.query(strins, [req.body.title, req.body.content], (err, rows) => {
        // console.log(err);
        // console.log(rows);
        res.redirect('/introBack')
    })
})

//简介修改
router.get('/edit1', function(req, res, next) {
    if (req.query.id != undefined) {
        var strsel = 'select * from introduce where id = ?';
        database.query(strsel, [req.query.id], (err, row) => {
            res.render('edit1', { row: row[0] });
        })
    }
})

router.post('/edit1', (req, res) => {
    var user = req.session.user;
    if (!user) {
        res.render('adlo', { message: '尚未登录，请管理员登录后操作 ' });
        return;
    }
    var body = req.body
    var user2 = new User2(body.title, body.content)
    var strupd = 'update introduce set title = "' + user2.title + '" ,content = "' + user2.content + '" where id = ?';
    database.query(strupd, [req.body.id], (err, rows) => {
        console.log(err);
        console.log(rows);
        res.redirect('/introBack')

    })
})

//简介删除
router.get('/del1', function(req, res, next) {
    if (req.query.id != undefined) {
        var strdel = 'select * from introduce where id = ?';
        database.query(strdel, [req.query.id], (err, row) => {
            res.render('del1', { row: row[0] });
        })
    }
})

router.post('/del1', (req, res) => {
    var user = req.session.user;
    if (!user) {
        res.render('adlo', { message: '尚未登录，请管理员登录后操作 ' });
        return;
    }
    var strdel = 'delete from introduce where id = ?';
    database.query(strdel, [req.body.id], (err, rows) => {
        console.log(err);
        console.log(rows);
        res.redirect('/introBack')

    })
})






//用户列表
router.get('/admin', function(req, res, next) {
    var strsel2 = 'select * from author';
    database.query(strsel2, (err, rows) => {
        res.render('admin', { data: rows })
    })
});


//登录成功
router.get('/yes', function(req, res, next) {
    res.render('yes')
});


//注册成功
router.get('/yeah', function(req, res, next) {
    res.render('yeah')
});

//管理员登录成功
router.get('/yess', function(req, res, next) {
    res.render('yess')
});




//用户功能
//用户新增
router.get('/add', function(req, res, next) {
    res.render('add')
})

router.post('/add', (req, res) => {
    var user = req.session.user;
    if (!user) {
        res.render('adlo', { message: '尚未登录，请管理员登录后操作 ' });
        return;
    }
    var strins = 'insert into author(username, password, re_password) values(?,?,?)';
    database.query(strins, [req.body.username, req.body.password, req.body.password], (err, rows) => {
        console.log(err);
        console.log(rows);
        res.redirect('/author')
    })
})

//用户编辑
router.get('/edit', function(req, res, next) {
    if (req.query.id != undefined) {
        var strsel = 'select * from author where id = ?';
        database.query(strsel, [req.query.id], (err, row) => {
            res.render('edit', { row: row[0] });
        })
    }
})

router.post('/edit', (req, res) => {
    var user = req.session.user;
    if (!user) {
        res.render('adlo', { message: '尚未登录，请管理员登录后操作 ' });
        return;
    }
    var body = req.body
    var user1 = new User(body.username, body.password)
    var strupd = 'update author set username = "' + user1.username + '",password = ' + user1.password + ',re_password = ' + user1.password + ' where id = ?';
    database.query(strupd, [req.body.id], (err, rows) => {
        console.log(err);
        console.log(rows);
        res.redirect('/author')

    })
})

//用户删除
router.get('/del', function(req, res, next) {
    if (req.query.id != undefined) {
        var strdel = 'select * from author where id = ?';
        database.query(strdel, [req.query.id], (err, row) => {
            res.render('del', { row: row[0] });
        })
    }
})

router.post('/del', (req, res) => {
    var user = req.session.user;
    if (!user) {
        res.render('adlo', { message: '尚未登录，请管理员登录后操作 ' });
        return;
    }
    var strdel = 'delete from author where id = ?';
    database.query(strdel, [req.body.id], (err, rows) => {
        console.log(err);
        console.log(rows);
        res.redirect('/author')

    })
})


//后台管理员页面
router.get('/myself', function(req, res, next) {
    var strsel = 'select * from administrator';
    database.query(strsel, (err, rows) => {
        res.render('myself', { data: rows });
    })
});

//管理员更改资料：
router.get('/edit2', function(req, res, next) {
    if (req.query.id != undefined) {
        var strsel = 'select * from administrator where id = ?';
        database.query(strsel, [req.query.id], (err, row) => {
            res.render('edit2', { row: row[0] });
        })
    }
})

router.post('/edit2', (req, res) => {
    var user = req.session.user;
    if (!user) {
        res.render('adlo', { message: '尚未登录，请管理员登录后操作 ' });
        return;
    }
    var form = formidable({
        multiples: true, //多文件上传
        uploadDir: path.join(__dirname, "../public/imgs") //路径
    });
    form.parse(req, (err, fields, files) => {
        var newName = path.join(__dirname, "../public/imgs", Date.now() + path.extname(files.img.name));
        fs.rename(files.img.path, newName, (err => {
            console.log(err);
        }));
        var body = fields
        var user3 = new User3(body.username, body.mail, body.telephone, body.habit, body.password, newName)
        var strupd = 'update administrator set username = "' + user3.username + '",mail = "' + user3.mail + '",telephone = ' + user3.telephone + ',habit = "' + user3.habit + '",password = ' + user3.password + ',re_password = ' + user3.password + ',img = "' + "/imgs/" + newName.substring(newName.length - 17) + '" where id = ?';
        // console.log(newName);
        // console.log(newName.substring(newName.length - 17));
        database.query(strupd, [fields.id], (err, rows) => {
            if (err) throw err;
            // console.log(err);
            // console.log(rows);
            res.redirect('/myself')

        })
    });
})








//曾经多页面
//小米页面
router.get('/xm', function(req, res, next) {
    res.render('xm')
});

//望庐山瀑布
router.get('/see_lushan', function(req, res, next) {
    res.render('see_lushan')
});

//当当网
router.get('/ddw', function(req, res, next) {
    res.render('ddw')
});

//小米导航栏
router.get('/mi', function(req, res, next) {
    res.render('mi')
});

//制作计算器
router.get('/calculation', function(req, res, next) {
    res.render('calculation')
});


module.exports = router;