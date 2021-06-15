var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    req.session.user = null;
    res.redirect('/adlo');
});

module.exports = router;