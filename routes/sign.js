/**
 * Created by baohua on 17/5/10.
 */
var express = require("express"),
    router = express.Router(),
    assert = require('assert');
var crypto = require('crypto'),
    User = require('../models/user');

var isEmptyObj = function(obj) {
    for(key in obj){
        return false;
    }
    return true;
};

router.get('/in', function(req, res) {
    res.render('in');
});

router.post('/aIn', function(req, res) {

    var data = req.body;
    console.log(data);
    var userModule = new User();
    userModule.get(data.user, function(err, docs) {
        console.log('dosc: ', docs);
        const isPass = !isEmptyObj(docs) && docs.pwd == data.pwd;
        if(isPass){
            res.json({ status: 0, msg: 'pass' });
        }else {
            res.json({status: 1, msg: '账号或密码有误！'});
        }
        res.end();
    })
});

module.exports = router;