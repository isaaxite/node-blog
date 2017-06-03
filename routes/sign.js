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
  res.render('in', {
    title: 'Sign In'
  })
});

router.get('/out', function(req, resp){
  delete req.session.userinfo;
  resp.redirect(303, '/index');
});

router.get('/save', function(req, resp) {
  var data = req.query;
  var md5 = crypto.createHash('md5'),
    pwd = md5.update(String(data.pwd)).digest('hex');

  var user = new User({user: String(data.user), pwd: pwd});
  user.save(function(err, docs) {
    resp.end();
  });
});

router.post('/aIn', function(req, res) {

  var data = req.body;
  console.log(data);
  var userModule = new User();
  userModule.get(data.user, function(err, docs) {
    var md5 = crypto.createHash('md5'),
      pwd = md5.update(String(data.pwd)).digest('hex');

    const isPass = !isEmptyObj(docs) && docs.pwd === pwd;

    if(isPass){
      req.session.userinfo = { name: data.user };
      res.json({ status: 0, msg: 'pass' });
    }else {
      res.json({status: 1, msg: '账号或密码有误！'});
    }
    res.end();
  })
});

module.exports = router;