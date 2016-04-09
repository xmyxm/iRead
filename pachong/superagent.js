/**
 * Created by xuanfengchen on 16-3-18.
 */
//提供jquery的功能进行dom节点操作
var cheerio = require('cheerio');
var superagent = require('superagent');
var superagentCharset = require('superagent-charset');
var iconv = require('iconv-lite');

console.log(superagent.exports);
// 用 superagent 去抓取 https://cnodejs.org/ 的内容
superagentCharset.get('http://yuedu.baidu.com/')
    .charset('gbk')
    .end(function (err, sres) {
        // 常规的错误处理
        if (err) {
            return next(err);
        }
        // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
        // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
        // 剩下就都是 jquery 的内容了
       //console.log(sres.text.substr(1000,3000));return;
       var html = iconv.decode(sres.text,'gb2312');
        var $ = cheerio.load(html,{decodeEntities: false});
        console.log($.html().substr(1000,3000)); return;
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
                //add(bookData);
                booklist.push(bookData);
                //console.log(bookData.id);
                //console.log('-------------title------------'+  (bookData.title));
            }
            item.booklist = booklist;
            data.push(item);
        }
        console.log(JSON.stringify(data));
});



