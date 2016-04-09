define(["react","jsx!MsgTextComponent"],function(React,MsgTextComponent){
    var MsgView = React.createBackboneClass({
                getInitialState: function() {
                  return {msgData: this.props.model.get()};
                },
                sendInfo:function(){
                  var content = this.refs.msgContent.getDOMNode().value;
                  var to = this.refs.to.getDOMNode().value;
                  this.props.sendMsg({content:content,to:to},this.setMsgState);
                },
                setMsgState:function(msgdata){
                  this.setState(msgdata);
                },
              render:function(){
              var infolist=[{lcaClass:"bubble_default left",imgSrc:"./style/img/guweiicon.jpg",imgTitle:"顾伟",userClass:"you",content:"阿斯顿"},
                            {lcaClass:"bubble_primary right",imgSrc:"./style/img/cxficon.jpg",imgTitle:"晨曦沐枫",userClass:"me",content:"水电费"},
                            {lcaClass:"bubble_default left",imgSrc:"./style/img/guweiicon.jpg",imgTitle:"顾伟",userClass:"you",content:"大概"}];
                return(
                	<div id="chatArea" className="box chat ng-scope">
                        <div className="box_hd">
                            <div id="chatRoomMembersWrap"></div>
                            <div className="title_wrap">
                                <div className="title poi">
                                    <a className="title_name ng-binding">顾伟</a>
                                    <i className="web_wechat_down_icon"></i>
                                </div>
                            </div>
                        </div>

                        <div className="scroll-wrapper box_bd chat_bd scrollbar-dynamic" style={{position:"absolute"}}>
                            <div className="box_bd chat_bd scrollbar-dynamic scroll-content" style={{marginBottom:"0px",marginRight:"0px",height:"400px"}}>
                                  {
                                      infolist.map(function(item){
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
                                <a className="btn btn_send" href="javascript:;" onClick={this.sendInfo}>发送</a>
                            </div>
                            <div>
                            to:<input type="text" ref="to"/>
                            </div>
                        </div>
                </div>
                );
            }
    });
return MsgView;
})




//<pre id="editArea" className="flex edit_area ng-isolate-scope ng-valid ng-dirty" contenteditable="true"></pre>
//<span className="caret_pos_helper" id="caretPosHelper"></span>





