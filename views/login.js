/**
 * Created by xuanfengchen on 16-3-21.
 */
define(['react','koala','Model','router','jsx!LoginComponent'],function(React,koala,Model,router,LoginComponent){
    koala.pageView.loginView = koala.pageView.extend({
        tagName:'section',
        className:'koala_login',
        onCreate:function(params){

        },
        onShow:function(){
            var loginView = React.createFactory(LoginComponent);
            loginView = loginView({register:this.register,login:this.login,signout:this.signout});
            React.render(loginView,document.getElementsByClassName('koala_login')[0]);
        },
        onLoad:function(){},
        onHide:function(){},
        register:function(param){
            var options={
                type:'post',
                sucBack:function(sucdata){console.log('请求成功，返回结果：'+JSON.stringify(sucdata));},
                errBack:function(errodata){console.log('请求失败，出错原因：'+JSON.stringify(errodata));}
            };
            koala.ajax("http://localhost:3000/register",param,options);
            var Router = new koala.Router();
            var book = new koala.Model({
                storage:{
                    keyname: "bookItemDB",
                    init: {
                        defaultData: param,
                        "lifeTime": "2D",
                        "maxSize": "2M",
                        "engine": sessionStorage
                    }
                }
            });
        },
        login:function(param){
            var options={
                type:'post',
                sucBack:function(sucdata){
                    koala.socketinit();
                    console.log('请求成功，返回结果：'+JSON.stringify(sucdata));
                    router.navigate('ulist');
                },
                errBack:function(errodata){console.log('请求失败，出错原因：'+JSON.stringify(errodata));}
            };
            koala.ajax("http://localhost:3000/login",param,options);
            var Router = new koala.Router();
            var book = new koala.Model({
                storage:{
                    keyname: "bookItemDB",
                    init: {
                        defaultData: param,
                        "lifeTime": "2D",
                        "maxSize": "2M",
                        "engine": sessionStorage
                    }
                }
            });

        },
        signout:function(param){
            var options={
                type:'post',
                sucBack:function(sucdata){console.log('请求成功，返回结果：'+JSON.stringify(sucdata));},
                errBack:function(errodata){console.log('请求失败，出错原因：'+JSON.stringify(errodata));}
            };
            koala.ajax("http://localhost:3000/signout",param,options);
        }
    });
    return koala.pageView.detailView;
})