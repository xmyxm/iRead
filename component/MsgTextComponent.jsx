define(["react"],function(React){
    var MsgView = React.createBackboneClass({
              render:function(){
              var info =this.props.info;
                return(
                    <div className="ng-scope">
                           <div className="clearfix">
                                    <div  style={{overflow:"hidden"}}>
                                            <div className={"message " + info.userClass}>
                                                    <img className="avatar" src={info.imgSrc} title={info.imgTitle} />
                                                    <div className="content">
                                                            <div className={"bubble js_message_bubble " +info.lcaClass}>
                                                                    <div className="bubble_cont">
                                                                            <div className="plain">
                                                                                    <pre className="js_message_plain ng-binding">{info.content}</pre>
                                                                                    <img className="ico_loading ng-hide" src="https://res.wx.qq.com/zh_CN/htmledition/v2/images/icon/ico_loading28a2f7.gif" alt="" />
                                                                                    <i className="ico_fail web_wechat_message_fail" title="重新发送"></i>
                                                                            </div>
                                                                    </div>
                                                            </div>
                                                    </div>
                                            </div>
                                    </div>
                            </div>
                    </div>
                );
            }
    });
    return MsgView;
})










