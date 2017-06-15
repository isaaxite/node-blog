var express = require('express');
var router = express.Router();
var multer = require('multer');
var upd = multer({ dest: 'public/uploads/' });

module.exports = router;

router.get('/?(/test)?', function(req, resp) {
	resp.render('test');
});

router.post('/upload', upd.any(), function(req, resp) {
  console.log(req.file);
  console.log(req.files);
  resp.send('test upload file');
});