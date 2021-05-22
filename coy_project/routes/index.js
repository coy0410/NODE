var express = require('express');
var router = express.Router();
// var mysql = require('./../database');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

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
    res.render('blog')
});

//影视
router.get('/video', function(req, res, next) {
    res.render('video')
});




module.exports = router;