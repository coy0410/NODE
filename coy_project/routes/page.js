var express = require('express');
const { render } = require('../app');
var router = express.Router();
var crypto = require('crypto');
var database = require('../database')

/* 登录页. */
router.get('/', function(req, res, next) {
    res.render('page');
});

//登录
router.post('/', (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    var hash = crypto.createHash('md5');
    hash.update(password);
    password = hash.digest('hex');
    var query = 'select * from author where username =' + database.escape(username) + 'and password=' + database.escape(password);
    database.query(query, function(err, rows, fields) {
        if (err) {
            console.log(err);
            return
        }
        res.redirect('/project');

    })
});

module.exports = router;