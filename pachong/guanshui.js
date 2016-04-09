/**
 * Created by xuanfengchen on 16-3-16.
 */
var http = require('http');
var iconv = require('iconv-lite');
var Bufferhelper =require('bufferhelper');
var cheerio = require('cheerio');
/*************************慕课 start*******************************/
var postdata = 'content=老师讲的真好&mid=8837';
var options1 = {
    hostname:'www.imooc.com',
    port:80,
    path:'/course/docomment',
    method:'post',
    headers:{
        'Host': 'www.imooc.com',
        'Connection': 'keep-alive',
        'Content-Length': postdata.length,
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Origin': 'http://www.imooc.com',
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.87 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Referer': 'http://www.imooc.com/video/8837',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.8',
        'Cookie': 'PHPSESSID=91a60irg8rpgbjlmu8mch69611; imooc_uuid=587efd57-6a34-485e-a4b8-68c7a4e74e26; imooc_isnew=1; imooc_isnew_ct=1458053302; IMCDNS=0; loginstate=1; apsid=FlZmNiMGM1ODEwZjI1YzY5MDQwMTBmNWEzZmVlNjcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjI4NTYwMgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA1NzQzMjIxODlAcXEuY29tAAAAAAAAAAAAAAAAAAAAADM2NmUwN2IwYTIyNWNhYTk5NWRjMmRmNzIzZjdjNWJjCSHoVgkh6FY%3DOW; last_login_username=574322189%40qq.com; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1457272587,1457971041,1458053294; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1458057213; cvde=56e820b6633e5-22'
    }
};
/***************************慕课 end****************************/

/*************************慕课 start*******************************/
var options = {
    hostname:'yd.baidu.com',
    port:80,
    path:'',
    encoding: null,
    method:'get',
    gzip:true,
    headers:{
        'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,**/*//*;q=0.8',
        'Accept-Encoding':'gzip, deflate, sdch',
        'Accept-Language':'zh-CN,zh;q=0.8',
        'Cache-Control':'no-cache',
        'Connection':'keep-alive',
        'Cookie':'BAIDUID=D404331F4236CAF337840DDD02104C8C:FG=1; PSTM=1457597935; BIDUPSID=D404331F4236CAF337840DDD02104C8C; BDUSS=EwNDZubFg5UmhFUWtLS2FPdy16a2dPVlZsOGE1VnV3YWlaaGhYWjJCWHQ4QTVYQVFBQUFBJCQAAAAAAAAAAAEAAADltnAtQ2~QoffI07AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO1j51btY-dWfj; BDSFRCVID=9H0sJeC62Rilllr4TptHJFLnBmCoYFoTH6aoRUiGQW8IwqTJvCg9EG0PfOlQpYD-fPs4ogKK0eOTHvvP; H_BDCLCKID_SF=JbkDoKI-JCvbfP0khtQBMtkXqxby26P8bbReaJ5nJD_-fRRpetCM3b8eDt6lWP6GaGCL5b7tQpP-HJ7a0RjY5bIRyJPtabQQ2Ct8Kl0MLpc-DMjxWf8VXj8IDfnMBMPj5mOnaPQKLIF5MDL9jj-Ben-W5gIDJ6oBaKuX3buQflP2qpcNLTDK04FjhMvHtp3jbgbZKqR80J6TDUTDhpO1j4_e0Ro00hoUfg5fQxbFbqOJbq5jDh3tXPAuKbrRe45T-bny0hvctn5cShnC5l00-nDSHH_ttj0j3f; MCITY=-218%3A289%3A; Hm_lvt_3f70ade922fc788ace2ba7516301fe89=1458099005; Hm_lpvt_3f70ade922fc788ace2ba7516301fe89=1458099624; BDRCVFR[feWj1Vr5u3D]=I67x6TjHwwYf0; H_PS_PSSID=19291_1428_18094_17947_17001_15791_11991_19369_10633',
        'Host':'yd.baidu.com',
        'Pragma':'no-cache',
        'User-Agent':'Mozilla/5.0 (Linux; Android 4.3; Nexus 7 Build/JSS15Q) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2307.2 Mobile Safari/537.36'
    }
};
/***************************慕课 end****************************/


 var req = http.request(options,function(res){
     console.log('status:'+res.statusCode);
     console.log('headers:'+JSON.stringify(res.headers));
     var bufferhelper =new Bufferhelper();
     res.on('data',function(data){
         bufferhelper.concat(data);
         console.log('-------------下载中-------'+Buffer.isBuffer(data)+'-----');
     });
     res.on('end',function(){
         var html = iconv.decode(bufferhelper.toBuffer(),'gb2312');
         console.log(html.substr(1000,1000));
        var str = cheerio.load(html,{decodeEntities: false});
         console.log(str.html().substr(1000,1000));
        // console.log('结束'+JSON.stringify(dataObj));
         //console.log(str.html());
     });
 })
 req.on('error',function(){
     console.log('出错');
 });
 req.write(postdata);
 req.end();
 console.log('加入成功');

