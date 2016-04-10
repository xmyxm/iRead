var express = require('express');
var port = process.env.port || 3000;
var app = express();
var path = require('path');
//mongoose操作中间件
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//socket.io需要配合http中间件使用，如果express监听也需要把它传入http模块，官网docs讲的非常详细
var socketServer = require('http').Server(app);
var io = require('socket.io')(socketServer);
//express的session模块需要单独安装
var session = require('express-session');
//express的session模块需要单独安装
var cookieParser = require('cookie-parser');
//redis缓存模块
var redisStore = require('connect-redis')(session);

//mongonDB业务操作方法
var userbll = require('./models/bll/userbll');
var bookbll = require('./models/bll/bookbll');

socketServer.listen(4001);
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('express监听地址为：http://%s %s', host, port);
});

app.use(cookieParser());
app.use(session({
    //name: 设置 cookie 中，保存 session 的字段名称，默认为 connect.sid 。
    //store: session 的存储方式，默认存放在内存中，也可以使用 redis，mongodb 等。express 生态中都有相应模块的支持。
    //secret: 通过设置的 secret 字符串，来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改。
    //cookie: 设置存放 session id 的 cookie 的相关选项，默认为
    //(default: { path: '/', httpOnly: true, secure: false, maxAge: null })
    //genid: 产生一个新的 session_id 时，所使用的函数， 默认使用 uid2 这个 npm 包。
    //rolling: 每个请求都重新设置一个 cookie，默认为 false。
    //resave: 即使 session 没有被修改，也保存 session 值，默认为 true。
    // 假如你不想使用 redis 而想要使用 memcached 的话，代码改动也不会超过 5 行。
    // 这些 store 都遵循着统一的接口，凡是实现了那些接口的库，都可以作为 session 的 store 使用，
    // 比如都需要实现 .get(keyString) 和 .set(keyString, value) 方法。
    //req在经过session中间件的时候就会自动完成session的有效性验证、延期/重新颁发、以及对session中数据的获取了。
    // 经过中间件处理后，可以通过req.session访问session object。比如如果你在session中保存了session.userId就可以根据userId查找用户的信息了。
    name:'sessionid',
    store: new redisStore(),
    cookie:{path:'/',httpOnly:false,maxAge: 60000 * 1000},
    secret: 'somesecrettoken'
}));

app.use(bodyParser());

//mongodb的连接地址,test为数据库名称
mongoose.connect('mongodb://localhost/test'); //创建一个数据库连接


app.get('/test',function(req,res){
    res.send('我是test页面');
});

//处理静态图片
app.use('/style/img',express.static('style/img'));
//处理静态样式请求
app.use('/style',express.static('style'));
//处理静态js请求
app.use('/libs',express.static('libs'));
//js模块配置文件路径
app.use('/appConfig',express.static('appConfig'));
//路由模块
app.use('/router',express.static('router'));
//ui组件模块
app.use('/ui',express.static('ui'));
//视图js
app.use('/views',express.static('views'));
//js数据模型
app.use('/models',express.static('models'));
app.use('/models/schema',express.static('models/schema'));
//react组件地址
app.use('/component',express.static('component'));

//默认路径下访问app.html页面
app.get('/',function(req,res){
   res.sendFile(path.join(__dirname,'App.html'), function(err, file) {
       if(err) {
           res.writeHead(500, {"Content-Type": "text/plain"});
           res.write(err + "\n");
           res.end();
       } else {
           //res.writeHead(200, {"Content-Type": "text/plain"});
           //res.write(file, "binary");
           //res.end();
       }
   });
});

app.get('/o',function(req,res){
    var session = req.session;
    console.log(req.session.count);
    session.count = session.count || 0;
    var n = session.count++;
    res.send('hello, session id:' + session.id + ' count:' + n);
});

app.post('/bookindex',function(req,res){
    bookbll.bookindex(req,res);
});

app.post('/bookfindOne',function(req,res){
    bookbll.bookfindOne(req,res);
});

app.post('/bookdel',function(req,res){
    bookbll.bookdel(req,res);
});
app.post('/bookUpdateByid',function(req,res){
    bookbll.bookUpdateByid(req,res);
});

app.post('/bookadd',function(req,res) {
    bookbll.bookadd(req,res);
});
app.post('/login',function(req,res){
    userbll.signin(req,res);
});
app.post('/signout',function(req, res){
    userbll.signout(req,res);
});
app.post('/register',function(req,res){
    userbll.register(req,res);
});
app.get('/userinfo',function(req,res){
    userbll.userinfo(req,res);
});
var usocket = {},userscount = 0;
io.on('connection', function (socket) {
    console.log('通信中------');
    socket.on('inform', function(data) {
        console.log(data);
        if(data.type == 'online'){
            //如果当前 用户未登陆 或者 页面刷新 都需要直接登陆
            if(!usocket[data.user] || data.Refresh){
                usocket[data.user] = socket;
                if(!data.Refresh){
                    ++userscount;
                }
                console.log("成功登陆");
            }else{
                console.log("拒绝重复登陆"+usocket[data.user]+"*********"+data.user+"是否一样:"+(usocket[data.user]==socket));
            }
        }else if(data.type == 'offline'){
            delete usocket[data.user];
            --userscount;
        }
        //发送在线用户信息
        var userArray =new Array();
        for(var x in usocket){userArray.push(x);}
        socket.emit('ALL',{userscount:userscount,userslist:userArray});
    });
    socket.on('message', function (data) {
        console.log(data);
        console.log(usocket[data.to]+'************'+usocket[data.user]);
        if (usocket[data.to] && usocket[data.user]) {
            console.log("找到了");
            usocket[data.to].emit(data.to, data);
            usocket[data.user].emit(data.user, data);
        }
    });
});
//处理404错误
app.use(function(req, res, next) {
    res.status(404).send('访问地址不存在，请检查文件是否存在！');
});
