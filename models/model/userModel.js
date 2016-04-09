/**
 * Created by xuanfengchen on 16-3-23.
 */
var mongoose = require('mongoose');
var bookSchema = require('../schema/userSchema.js');
//指定数据库表名称为user
var UserModel = mongoose.model('user',bookSchema,'user');
module.exports = UserModel;

