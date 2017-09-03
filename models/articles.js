/**
 * Created by baohua on 17/6/2.
 */
var mongodb = require('./db');

function Articles() {}

module.exports = Articles;

Articles.prototype.dbName = 'articles';

Articles.prototype.save = function(options,callback) {
  var dbName = this.dbName;
  var data = options;

  mongodb.open(function(err, db) {
    if(err){ return callback(err); }
    db.collection(dbName, function(err, collection) {
      if(err) {
        mongodb.close();
        return callback(err);
      }
      collection.insert(data, {safe: true}, function(err, docs) {
        mongodb.close();
        if(err){ return callback(err); }
        callback(null, docs);
      })
    });
  });
};

Articles.prototype.find = function(count, callback, sort){
  var that = this;
  mongodb.open(function(err, db) {
    if(err){ return callback(err); }
    db.collection(that.dbName, function(err, collection) {
      if(err){
        mongodb.close();
        return callback(err);
      }

      collection.find().sort(sort).toArray(function(err, docs) {
        mongodb.close();
        if(err) { return callback(err); }
        callback(null, docs);
      });
    });
  });
};

Articles.prototype.findById = function(id, callback){
  var that = this;
  var ObjectId = require('mongodb').ObjectID;

  mongodb.open(function(err, db) {
    if(err){ return callback(err); }
    db.collection(that.dbName, function(err, collection) {
      if(err){
        mongodb.close();
        return callback(err);
      }

      collection.findOne({'_id': ObjectId(id)}, function(err, docs) {
        mongodb.close();

        if(err) { return callback(err); }
        callback(null, docs);
      });
    });
  });
};

Articles.prototype.deleteById = function(id, callback) {
  var that = this;
  var ObjectId = require('mongodb').ObjectID;
  mongodb.open(function(err, db) {
    if(err){ return callback(err); }
    db.collection(that.dbName, function(err, collection) {
      if(err){
        mongodb.close();
        return callback(err);
      }

      collection.remove({'_id': ObjectId(id)}, function(err) {
        mongodb.close();

        if(err) { return callback(err); }
        callback(null);
      });

    });
  });
};

Articles.prototype.update = function(options, callback) {
  var that = this;
  var ObjectId = require('mongodb').ObjectID;
  mongodb.open(function(err, db) {
    if(err){ return callback(err); }
    db.collection(that.dbName, function(err, collection) {

      if(err){
        mongodb.close();
        return callback(err);
      }

      collection.update({'_id': ObjectId(options.id)}, {
          $set: { 
            cover: options.cover,
            title: options.title,
            abstract: options.abstract,
            markdown: options.markdown
          }
      }, function(err) {
        mongodb.close();
        if(err) { return callback(err); }
        callback(null);
      });
    });
  });
};
