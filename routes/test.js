var express = require('express');
var router = express.Router();
var multer = require('multer');
var upd = multer({ dest: 'temp/' });
var qiniu = require('../models/qiniu');

module.exports = router;

router.get('/?(/test)?', function(req, resp) {
	resp.render('test');
});

router.post('/upload', upd.any(), function(req, resp) {
  console.log(req.file);
  console.log(req.files);
  resp.send('test upload file');
});

router.post('/qiniu', function(req, resp) {
	console.log(req);
  resp.send('test upload file');
});

router.get('/qiniu', function(req, resp) {
	var $date = new Date();
	var filename = $date.getTime() + '.png';
	var path = './routes/sign.js';
	qiniu.uploadFile(filename, path, function(err, ret) {
		if(err) {
			console.log(err);
			resp.send('上传失败');
		} else {
			console.log(ret);
			resp.send('上传成功');
		}
	});
});