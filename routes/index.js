var express = require('express');
var router = express.Router();
var Article = require('../models/articles');

/* GET home page. */
router.get('/index', function(req, resp, next) {
  var article = new Article();
  article.find(0, function(err, docs) {
    // console.log(docs);
    resp.render('index', {
      title: '主页',
      data: docs
    });
  });
});

router.get('/article/:id', function(req, resp) {
  var id = req.params.id;
  var article = new Article();
  article.findById(id, function(err, docs) {
    resp.render('article', {
      title: '文章',
      data: docs
    });
  });
});

router.get('/archive', function (req, resp) {
  resp.render('archive', { title: '归档' });
});

router.get('/about', function (req, resp) {
  resp.render('about', { title: '关于' });
});

router.get('/add(/:id)?', function (req, resp) {
  var id = req.params.id;
  if(id) {
    var article = new Article();
    article.findById(id, function (err, docs) {
      resp.render('add', {
        title: '修改文章',
        data: docs
      });
    });
  }else {
    resp.render('add', {title: '添加文章', data: {}});
  }
});

router.post('/aDelete', function(req, resp) {
  var id = req.body.id;
  console.log(id);
  var article = new Article();
  article.deleteById(id, function(err) {
    if(err){
      console.error("删除失败！");
      resp.json({ status: 1, msg: "删除失败！" });
      return false;
    }
    resp.json({ status: 0, msg: 'success' });
  });
});

router.all('/upload', function(req, resp) {

});

router.post('/aSaveArticle', function (req, resp) {
  var date = new Date();
  var data = {
    title: req.body.title,
    markdown: req.body.markdown,
    createAt: date.getTime(),
    updateAt: date.getTime()
  };
  var article = new Article();
  article.save(data, function(err, docs) {
    console.log(docs);
    resp.json({ status: 0, msg: 'test' });
    resp.end();
  });
});

module.exports = router;