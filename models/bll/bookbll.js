/**
 * Created by xuanfengchen on 16-3-24.
 */
var bookdal = require('../dal/bookdal');

module.exports = {
    bookindex:function(req,res) {
        bookdal.bookindex(function(info){res.json(info);return;});
    },
    //数据修改方法
    //参数 bookobj 基础查询条件对象
    //返回消息状态对象
    bookfindOne:function(req,res){
        var _bookobj = {};
        if(req.body.id){
            _bookobj.id = req.body.id;
        }
        if(req.body._id){
            _bookobj._id = req.body._id;
        }
        bookdal.findOne(_bookobj,function(info){res.json(info);return;});
    },
    bookdel:function(req,res){
        var _bookobj = {};
        if(req.body.id){
            _bookobj.id = req.body.id;
        }
        if(req.body._id){
            _bookobj._id = req.body._id;
        }
        bookdal.Remove(_bookobj,function(info){res.json(info);});
    },
    bookUpdateByid:function(req,res){
        var _bookobj = {
            id:0,
            src:req.body.src||'./style/img/a50f4bfbfbedab647a830db8f136afc378311ed0.jpg',//图片地址
            title:req.body.title||'',//书名
            content:req.body.content||'',//内容
            author:req.body.author||'',//作者
            rq:req.body.rq||0,//阅读量
            comments_count:req.body.comments_count||0,
            classify:req.body.classify || '',//分类
            price:req.body.price||0,//价格
            currentPrice:req.body.currentPrice||0
        };
        bookdal.Update(_bookobj,function(info){res.json(info);});
    },
    bookadd:function(req,res){
        //get方式取出参数req.params.title
        //取出参数对应键值req.query
        //post方式获取参数req.body.title
        var _id = req.params.id || 0;
        var _bookobj = {
            id: 0,
            src: req.body.src || './style/img/a50f4bfbfbedab647a830db8f136afc378311ed0.jpg',//图片地址
            title: req.body.title || '',//书名
            content: req.body.content || '',//内容
            author: req.body.author || '',//作者
            rq: req.body.rq || 0,//阅读量
            comments_count:0,
            classify:req.body.classify || '',//分类
            price: req.body.price || 0,//价格
            currentPrice: req.body.currentPrice || 0
        };
        //异步编程，所以回调方法需要以参数的形式传送过去
        bookdal.Save(_bookobj,function(info){res.json(info);});
    }
}