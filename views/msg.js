/**
 * Created by xuanfengchen on 16-3-29.
 */
define(['react','koala','Model','socket','jsx!MessageComponent'],function(React,koala,Model,Socket,MessageComponent){
    koala.pageView.msgView = koala.pageView.extend({
        tagName:'section',
        className:'koala_msg',
        onCreate:function(){

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
        },
        sendMsg:function(data){
            var href = document.location.href;
            data.to = href.substr(href.indexOf("msg/")+4);
            data.type = 'private';
            if(data.to){
                if(koala.sendMsg){
                    koala.sendMsg(data);
                }else{
                    koala.socketinit(true);
                    koala.sendMsg(data);
                }
            }else{
                console.log("当前用户不存在",'color:red');
            }
        },
        onShow:function(name){
            //console.log('name:'+JSON.stringify(name.params));
            var href = document.location.href;
            var to = href.substr(href.indexOf("msg/")+4);
            var msgObjlist = Model.msglistdb.get();
            var msgData = null;
            if(msgObjlist){
                for(var i= 0,l=msgObjlist.length;i<l;i++){
                    if(msgObjlist[i].to == to){
                        msgData = msgObjlist[i];
                    }
                }
            }
            Model.currentMsgdb.set(msgData);
            var MsgTextView = React.createFactory(MessageComponent);
            MsgTextView = MsgTextView({model:Model.currentMsgdb,userlistdb:Model.userlistdb,sendMsg:this.sendMsg,to:to});
            React.render(MsgTextView,document.getElementsByClassName('koala_msg')[0]);
        },
        onLoad:function(){

        },
        onHide:function(){

        }
    });
    return koala.pageView.msgView;
})