/**
 * Created by xuanfengchen on 16-3-29.
 */
define(['react','koala','Model','socket','jsx!MessageComponent'],function(React,koala,Model,Socket,MsgTextComponent){
    koala.pageView.msgView = koala.pageView.extend({
        tagName:'section',
        className:'koala_msg',
        onCreate:function(){
            var UcView = React.createFactory(MsgTextComponent);
            UcView = UcView({model:Model.userdb,sendMsg:this.msg});
            React.render(UcView,document.getElementsByClassName('koala_msg')[0]);
        },
        msg:function(){
            var username = koala.getCookieValue("username");
            var socket = Socket.connect('http://localhost:4001');
            var Model = "";
            socket.on('message', function (msg) {
                console.log(msg);//接受全体广播
            });
            socket.on('userJoin', function (msg) {
                console.log(msg);//用户登陆后反馈在线人数
            });
            socket.emit('userJoin',{user:username});
            socket.on('message' +username, function (data) {
                console.log(data);
                //data =
            });
            var sendMsg = function(msg){
                socket.emit('message', { content: msg.content,to:msg.to,user:username});
            }
          return sendMsg;
        }(),
        onShow:function(){

        },
        onLoad:function(){

        },
        onHide:function(){

        }
    });
    return koala.pageView.msgView;
})