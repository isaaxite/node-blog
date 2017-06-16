var qiniu = require("qiniu");
//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = 'RJSfxqFGDGnZJMpcx-QMum6i2Q5FHDvAGiGLmUXG';
qiniu.conf.SECRET_KEY = '-Qhs2qUGHk41DtUiElisO0xN-ApPdSEL1-17yRIl';

function Qiniu() {
  this.qiniuHost = 'http://orngt3yey.bkt.clouddn.com/';
  this.bucket = 'node-blog';
}

Qiniu.prototype.uptoken = function(bucket, key) {
  var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
  return putPolicy.token();
};

/**
 *  @param key (文件名)
 *  @param localFile (路径)
 **/
Qiniu.prototype.uploadFile = function(key, localFile, callback) {
  var that = this;
  var uptoken = that.uptoken(this.bucket, key);
  var extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
      // ret.hash, ret.key, ret.persistentId
      ret.url = that.qiniuHost+ret.key;
      callback && callback(err, ret);
  });
};

module.exports = new Qiniu();
