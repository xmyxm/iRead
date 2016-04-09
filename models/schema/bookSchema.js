var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
    id:String,
    src:String,//图片地址
    title:{type:String,required:true},//书名,添加姓名非空约束
    content:String,//内容
    author:String,//作者
    rq:{type:Number,default:0},//阅读量
    price:{type:Number,min:0,max:1000},//价格,添加价格约束
    isShow:{type:Boolean,default:true},//约束是否显示
    classify:{type:String,enum:['青春','文学','历史','科幻','小说','言情','军事'],default:'青春'},//类型，枚举限定类型
    currentPrice:{type:Number,default:0},//当前售价
    comments_count:{type:Number,default:0},//评论数
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

module.exports = bookSchema;

