define(["react","koala","Model","jsx!MsgTextComponent"],function(React,koala,Model,MsgTextComponent){
    var MsgView = React.createBackboneClass({
                getInitialState: function() {
                    var msgObj = this.props.model.get();
                    var userlistObj = this.props.userlistdb.get().meInfo;
                    return {meInfo:userlistObj,touser:msgObj};
                },
                sendInfo:function(){
                  var content = this.refs.msgContent.getDOMNode().value;
                  var to = this.props.to;
                  this.props.sendMsg({content:content,to:to});
                },
                UpdateSendMsg:function(item){
                    var msgObjlist = Model.msglistdb.get();
                    var newMsg = null;
                    if(msgObjlist){
                        for(var i= 0,l=msgObjlist.length;i<l;i++){
                            if(msgObjlist[i].to == item.to){
                                newMsg = {id:item.user,content:item.content};
                                msgObjlist[i].contentlist.push(newMsg);
                            }
                        }
                    }
                    Model.msglistdb.set(msgObjlist);
                    var touser =  this.state.touser;
                    touser.contentlist.push(newMsg);
                    //console.log("msgObjlist:"+JSON.stringify(msgObjlist));
                    //console.log("contentlist:"+JSON.stringify(touser.contentlist));
                    this.setState({meInfo:this.state.meInfo,touser:touser});
                    //this.state.touser.set(touser);
                },
                componentWillMount:function(){
                    console.log("永远只执行一次");
                    var user = koala.getCookieValue("username");
                    self = this;
                    if(koala.socket){
                        koala.socket.on(user, function (msg) {
                            console.log(msg);//用户登陆后反馈在线人数
                            self.UpdateSendMsg(msg);
                        });
                    }else{
                        console.log("请重新建socket连接");
                    }
                },
                componentWillReceiveProps:function(){
                    console.log("组件接收到一个新的prop时会被执行，且该方法在初始render时不会被调用。");
                    var msgObj = this.props.model.get();
                    var userlistObj = this.props.userlistdb.get().meInfo;
                    this.setState({meInfo:userlistObj,touser:msgObj});
                },
              render:function(){
                console.log("顺序测试");
                var meInfo = this.state.meInfo;
                var touser =  this.state.touser;

                return(
                	<div id="chatArea" className="box chat ng-scope">
                        <div className="box_hd">
                            <div id="chatRoomMembersWrap"></div>
                            <div className="title_wrap">
                                <div className="title poi">
                                    <a className="title_name ng-binding">{touser.name}</a>
                                    <i className="web_wechat_down_icon"></i>
                                </div>
                            </div>
                        </div>

                        <div className="scroll-wrapper box_bd chat_bd scrollbar-dynamic" style={{position:"absolute"}}>
                            <div className="box_bd chat_bd scrollbar-dynamic scroll-content" style={{marginBottom:"0px",marginRight:"0px",height:"400px"}}>
                                  {
                                      touser.contentlist.map(function(item){
                                        if(item.id == meInfo.uid){
                                          item.lcaClass = "bubble_primary right";
                                          item.imgSrc = meInfo.imgSrc;
                                          item.imgTitle = meInfo.name;
                                          item.userClass = "me";
                                        }else{
                                            item.lcaClass = "bubble_default left";
                                            item.imgSrc = touser.imgSrc;
                                            item.imgTitle = touser.name;
                                            item.userClass = "you";
                                        }
                                            return (<MsgTextComponent info ={item} />);
                                      })
                                  }
                            </div>
                        </div>

                        <div className="box_ft ng-scope" >
                            <div className="toolbar" id="tool_bar">
                                <a className="web_wechat_face"  href="javascript:;" title="表情"></a>
                                <a className="web_wechat_screencut ng-isolate-scope" title="截屏"></a>
                                <a className="web_wechat_pic js_fileupload ng-isolate-scope webuploader-container" href="javascript:;" title="图片和文件">
                                    <div className="webuploader-pick"></div>
                                    <div id="rt_rt_1af078po91td6vaf1dc633rc6b1" style={{position:"absolute",top:"0px",left:"0px",width:"30px",height:"30px",overflow:"hidden",bottom:"auto",right:"auto"}}>
                                        <input type="file" name="file" className="webuploader-element-invisible" multiple="multiple"/>
                                        <label style={{opacity:"0",width:"100%",height:"100%",display:"block",cursor:"pointer",background:"rgb(255, 255, 255)"}}></label>
                                    </div>
                                </a>
                            </div>
                            <div className="content ng-isolate-scope">
                                 <textarea className="flex edit_area" ref="msgContent" style={{width:"90%",padding:"0 5%"}}></textarea>
                            </div>

                            <div className="action">
                                <span className="desc ng-scope">按下Ctrl+Enter换行</span>
                                <a className="wxbtn wxbtn_send" href="javascript:;" onClick={this.sendInfo}>发送</a>
                            </div>
                        </div>
                </div>
                );
            }
    });
return MsgView;
})






