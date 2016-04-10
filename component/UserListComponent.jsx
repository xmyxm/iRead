define(["react","jsx!UserItemComponent"],function(React,UserItemComponent){
    var UlistView = React.createBackboneClass({
                getInitialState: function() {
                var data = this.props.model.get();
                  return {userlist:data.userlist,userInfo:data.userInfo};
                },
              render:function(){
              var userlist = this.state.userlist;
              var userInfo = this.state.userInfo;
                return(
                    <div className="wx-panel">
                        <div className="header">
                            <div className="avatar">
                               <img className="img" src={userInfo.imgSrc} />
                           </div>
                           <div className="info">
                               <h3 className="nickname">
                                   <span className="display_name ng-binding">{userInfo.name}</span>
                                   <a className="opt">
                                       <i className="web_wechat_add"></i>
                                   </a>
                               </h3>
                           </div>
                        </div>

                        <div className="search_bar" id="search_bar">
                            <i className="web_wechat_search"></i>
                            <input className="frm_search ng-isolate-scope ng-pristine ng-valid" type="text" placeholder="搜索" />
                        </div>

                        <div className="tab">
                            <div className="tab_item">
                                <a className="chat" ui-sref="chat" title="聊天" href="#"><i className="web_wechat_tab_chat web_wechat_tab_chat_hl"></i></a>
                            </div>
                            <div className="tab_item">
                                <a className="chat" ui-sref="read" title="阅读" href="#"><i className="web_wechat_tab_public"></i></a>
                            </div>
                            <div className="tab_item no_extra">
                                <a className="chat" ui-sref="contact" title="通讯录" href="#"><i className="web_wechat_tab_friends"></i></a>
                            </div>
                        </div>
                        {userlist &&
                            <div className="nav_view" style={{visibility:"visible",width:"auto"}}>
                                <div className="scroll-wrapper chat_list scrollbar-dynamic" style={{position: "relative" }}>
                                    <div className="chat_list scrollbar-dynamic scroll-content scroll-scrolly_visible" id="J_NavChatScrollBody" style={{marginBottom:"0px",marginRight:"0px",height:"765px"}}>
                                        <p className="ico_loading ng-hide" style={{display:"none"}}>
                                            <img src="https://res.wx.qq.com/zh_CN/htmledition/v2/images/icon/ico_loading28a2f7.gif" alt="" />
                                            正在获取最近的聊天...
                                        </p>
                                        <div>
                                            <div className="top-placeholder" style={{height:"0px"}}></div>
                                            {
                                                userlist.map(function(user){
                                                    return (
                                                        <UserItemComponent userInfo ={user} />
                                                    );
                                                })
                                            }
                                            <div className="bottom-placeholder" style={{height: "4224px" }}></div>
                                        </div>
                                    </div>
                                    <div className="scroll-element scroll-x scroll-scrolly_visible">
                                        <div className="scroll-element_corner"></div>
                                        <div className="scroll-arrow scroll-arrow_less"></div>
                                        <div className="scroll-arrow scroll-arrow_more"></div>
                                        <div className="scroll-element_outer">
                                            <div className="scroll-element_size"></div>
                                            <div className="scroll-element_inner-wrapper">
                                                <div className="scroll-element_inner scroll-element_track">
                                                    <div className="scroll-element_inner-bottom"></div>
                                                </div>
                                            </div>
                                            <div className="scroll-bar" style={{width: "89px" }}>
                                                <div className="scroll-bar_body">
                                                    <div className="scroll-bar_body-inner"></div>
                                                </div>
                                                <div className="scroll-bar_bottom"></div>
                                                <div className="scroll-bar_center"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="scroll-element scroll-y scroll-scrolly_visible">
                                        <div className="scroll-element_corner"></div>
                                        <div className="scroll-arrow scroll-arrow_less"></div>
                                        <div className="scroll-arrow scroll-arrow_more"></div>
                                        <div className="scroll-element_outer">
                                            <div className="scroll-element_size"></div>
                                            <div className="scroll-element_inner-wrapper">
                                                <div className="scroll-element_inner scroll-element_track">
                                                    <div className="scroll-element_inner-bottom"></div>
                                                </div>
                                            </div>
                                            <div className="scroll-bar" style={{height:"133px",top:"0px"}}>
                                                <div className="scroll-bar_body">
                                                    <div className="scroll-bar_body-inner"></div>
                                                </div>
                                                <div className="scroll-bar_bottom"></div>
                                                <div className="scroll-bar_center"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                );
            }
    });
return UlistView;
})








