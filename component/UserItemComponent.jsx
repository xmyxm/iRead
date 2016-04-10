define(["react","router"],function(React,router){
    var UserItemView = React.createBackboneClass({
           goToMsg:function(){
              //阻止默认事件
              event.preventDefault();
              //阻止事件冒泡
              event.stopPropagation();
              var uid = this.refs.UserItem.getAttribute('data-uid');
              router.navigate('#msg/'+uid);
          },
          render:function(){
          var userInfo =this.props.userInfo;
          //console.log(userInfo.uid);
            return(
                    <div ref="UserItem" className="chat_item slide-left" onClick={this.goToMsg} data-uid={userInfo.to}>
                        {userInfo.lastMsgDate &&
                            <div className="ext">
                                <p className="attr ng-binding">{userInfo.lastMsgDate}</p>
                                <p className="attr ng-scope">
                                    <i className="web_wechat_no-remind web_wechat_no-remind_hl"></i>
                                </p>
                            </div>
                        }
                        <div className="avatar">
                            <img className="img" src={userInfo.imgsrc} />
                        </div>
                        <div className="info">
                            <h3 className="nickname">
                                <span className="nickname_text ng-binding">{userInfo.name}</span>
                            </h3>
                            <p className="msg">
                                <span>
                                  {userInfo.lastMsg}
                                </span>
                            </p>
                        </div>
                    </div>
            );
        }
    });
    return UserItemView;
})










