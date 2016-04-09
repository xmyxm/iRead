/**
 * Created by Myco on 2016/3/6.
 */
var mongoose = require('mongoose');
var bookSchema = require('../schema/bookSchema.js');
//指定数据库表名称为book
var BookModel = mongoose.model('book',bookSchema,'book');

module.exports = BookModel;