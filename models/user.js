/**
 * Created by baohua on 17/6/1.
 */
var mongodb = require('./db');

function User(options) {
    if(options){
        this.user = options.account;
        this.pwd = options.pwd;
    }
}

module.exports = User;

//存储用户信息
User.prototype.save = function(callback) {
    //要存入数据库的用户文档
    var user = {
        name: this.user,
        password: this.pwd
    };
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) { return callback(err); }
        //读取 users 集合
        db.collection('user', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);//错误,返回 err 信息
            }
            //将用户数据插入 users 集合
            collection.insert(user, {
                safe: true
            }, function (err, user) {
                mongodb.close();
                if (err) { return callback(err); }
                callback(null, user[0]);
            });
        });
    });
};

User.prototype.get = function(user, callback) {
    mongodb.open(function(err, db) {
        if (err) { callback(err); }

        db.collection('user', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            collection.findOne({
                user: user
            }, function (err, user) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null, user);
            });
        });
    });
};