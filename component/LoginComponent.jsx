define(["react",'koala','jsx!ShareComponent','router',"react.backbone"],function(React,koala,ShareComponent,router){
var BookExplainView = React.createBackboneClass({
    getparam:function (){
        var param ={
                 name:this.refs.name.getDOMNode().value,
                 pws:this.refs.pws.getDOMNode().value
            };
            if(!param.name){
                console.log('请输入用户名');return;
            }else if(param.name.length>1 && param.name.length<9){
                if(/\d/.test(param.name)){
                    console.log('验证成功!');
                }
            }else{
                console.log('用户名长度必须在5-9位之间');return;
            }
            if(!param.pws){
                console.log('请输入用户密码');return;
            }else if(param.pws.length<1 || param.pws.length>15){
                console.log('用户密码长度必须在6-15之间');return;
            }
       return param;
    },
     goBack: function(){
         router.goBack();
     },
     login:function(){
        this.props.login(this.getparam());
     },
     register:function(){
        this.props.register(this.getparam());
     },
     signout:function(){
        this.props.signout(this.getparam());
     },
    render:function(){
       return(
             <div className="panel panel-default">
                          <div className="panel-heading">
                            <h3 className="panel-title">登陆/注册</h3>
                          </div>
                          <div className="panel-body">
                            <div className="input-group">
                                  <div className="input-group-adr input-group-left">
                                        <span className="input-group-addon">账号</span>
                                  </div>
                                  <div className="input-group-adr input-group-right">
                                        <input type="text" className="form-control" ref="name" placeholder="邮箱/手机号" aria-describedby="basic-addon1" />
                                  </div>
                            </div>

                            <div className="input-group">
                                  <div className="input-group-adr input-group-left">
                                        <span className="input-group-addon">密码</span>
                                  </div>
                                  <div className="input-group-adr input-group-right">
                                        <input type="text" className="form-control" ref="pws" placeholder="密码" aria-describedby="basic-addon1" />
                                  </div>
                            </div>
                            <button type="button" className="btn btn-info" data-url="bookadd" onClick={this.login} >登陆</button>
                            <button type="button" className="btn btn-info" data-url="bookadd" onClick={this.register}>注册</button>
                            <button type="button" className="btn btn-info" data-url="bookadd" onClick={this.signout}>注销</button>
                        </div>
             </div>
            );
    }
});
return BookExplainView;
})
