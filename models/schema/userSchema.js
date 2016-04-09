/**
 * Created by xuanfengchen on 16-3-23.
 */
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name:String,
    pws:String,
    meta:{//object类型时间对象
        createDate:{
            type:Date,
            default:Date.now()
        },
        updateDate:{
            type:Date,
            default:Date.now()
        }
    }
},{versionKey:false});

module.exports = userSchema;