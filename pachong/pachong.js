/**
 * Created by Myco on 2016/3/15.
 */
/*
* iconv-lite 模块能配合 http 模块以及 request 模块使用，却不能直接和 superAgent 模块使用。
* 因为 superAgent 是以 utf8 去取数据，然后再用 iconv 转也是不行的。
* 页面是 gbk 编码的，sres.text 已经是 decode 过了的结果，
* 也就是说它已经被转换成 utf8 了，再转换成 buffer 出来的结果必须是不正确的。
*/

var http = require('http');
//提供jquery的功能进行dom节点操作
var cheerio = require('cheerio');
var mongoose = require('mongoose');
//纯Javascript转换编码的模块 iconv-lite
var iconv = require('iconv-lite');
//bufferhelper是一个操作buffer的加强类
var Bufferhelper =require('bufferhelper');

var BookModel = require('../models/model/bookModel');
//创建一个数据库连接
mongoose.connect('mongodb://localhost/test');
//设置访问地址，百度是gb2312编码的数据，所以必须使用iconv.decode
var url = 'http://yuedu.baidu.com/'

http.get(url,function(res){
    var bufferhelper =new Bufferhelper();
    res.on('data',function(data){
        console.log('------------下载中'+Buffer.isBuffer(data)+'-------------');
        bufferhelper.concat(data);
    });
    res.on('end',function(){
        console.log('------------结束-------------');
       var html = iconv.decode(bufferhelper.toBuffer(),'GBK');
        //console.log(html.substr(1000,2000));
        filtehtml(html);
    });
}).on('error',function(){
    console.log('获取数据失败！');
})

//html文档过滤出有效信息
function filtehtml(html){
   //cheerio本身默认是转实体的,所以保证转换成功必须加参数{decodeEntities: false},和编码无关
var $ = cheerio.load(html,{decodeEntities: false});
    var collist= $('.yd-reco-wrap');
    //console.log(collist.html());
    console.log('------------数据收集-------------');
    console.log('------------collist数据长度：'+collist.length+'-------------');
    var data = [];
    for(var i= 0,l=collist.length;i<l;i++){
        var docObj=  $(collist[i]);
        var item = {};
        item.bookColName = docObj.find('.mod-title').text();
        //console.log(item.bookColName);
        item.categoryId = 999999;
        var listObj = docObj.find('.book');
        var booklist = [];
        //console.log('-----'+i+'-------listObj数据长度：'+listObj.length+'-------------');
        for(var q= 0,ql=listObj.length;q<ql;q++){
        //console.log('-----'+q+'-------循环输出-------------');
            var bookObj = $(listObj[q]);
            var bookData = {};
            bookData.title = bookObj.find('.book-title').text();
            bookData.currentPrice = bookObj.find('.book-price').text().replace('￥','');
            bookData.src = bookObj.find('.book-cover .book-img')[0].attribs['data-src'];
            bookData.author = bookObj.find('.book-card-author').text();
            var url = bookObj.find('.book-card-wrap')[0].attribs.href;
            if(url){
                bookData.id = url.replace(/\/ebook\/|\?fr=index/g,'');
                bookData.url = url;
            }
            add(bookData);
            booklist.push(bookData);
            //console.log(bookData.id);
            //console.log('-------------title------------'+  (bookData.title));
        }
        item.booklist = booklist;
        data.push(item);
        //console.log(JSON.stringify(data));
    }
    //console.log(booklist);
}

function add(bookData){
    if(bookData.url){
        console.log('妈蛋');
        http.get('http://yuedu.baidu.com/'+bookData.url,function(res){
            var bufferhelper =new Bufferhelper();
            res.on('data',function(data){
                console.log('次奥');
                bufferhelper.concat(data);
            });
            res.on('end',function(){
                console.log('你猜*****************');
                var html = iconv.decode(bufferhelper.toBuffer(),'GBK');
                console.log(html);
                var $ = cheerio.load(html,{decodeEntities: false});
                var content = $('#bd .main .scaling-content p').text();

console.log(content);
            });
        }).on('error',function(){
                console.log('获取数据失败！');
            })
    }
}