define(["react",],function(React,){
    var UserView = React.createBackboneClass({
            render:function(){
            var userData = this.props.userData;
                return (
                           <div id="page_container" className="page_uc">
                            {userData &&
                                <div>
                                   <div className="usr" id="userInfo">
                                        <p className="userInfo app">
                                                <img src="http://himg.bdimg.com/sys/portrait/item/e5b6436fe5b08fe9ad85e5bdb1702d.jpg"/>
                                                {userData.name} <a href="http://wappass.baidu.com/passport/">退出</a><br/>

                                                <span>通知：已全面接入百度钱包支付，使用百度钱包可享1%返现优惠。</span>
                                        </p>
                                   </div>
                                   <div className="bookList">
                                        <ul id="async_list">
                                            <li>
                                              <a href="/view/cbc74dfabe23482fb4da4cba?app=" title="魔兽世界·战争罪行">
                                                  <img alt="我们青春都已落幕" src="./style/img/a50f4bfbfbedab647a830db8f136afc378311ed0.jpg" />
                                                  <h2>我们青春都已落幕</h2>
                                              </a>
                                            </li>
                                        </ul>
                                   </div>
                                </div>
                            }
                            {!userData &&
                           	    <div class="unLogin">
                                     <a href="http://wappass.baidu.com/passport/?authsite=1&amp;u=http%3A%2F%2Fyd.baidu.com%2Fuc" class="login">登录</a>
                                     <p>登陆百度账号，阅读已购买图书</p>
                                </div>
                            }
                           </div>
                )}
        });

    var UcView = React.createBackboneClass({
              render:function(){
                return(
                <div id="wrap">
                    <Header className="123" />
                    <ButtonList />
                    <UserView userData={this.props.model.get()} />
                </div>
                );
            }
    });

return UcView;
})










