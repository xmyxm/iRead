/**
 * Created by xuanfengchen on 16-3-24.
 */
var userdal = require('../dal/userdal');

module.exports = {
    signin:function(req,res){
        //console.log(req.session.userid);
        var user = {'name':req.body.name,'pws':req.body.pws};
        if(!user.name || !user.pws){
            res.send('用户名或者密码为空!');return;
        }
        userdal.findOne({name:user.name},function(info){
            var data = {isOk:info.isOk};
            if(info.isOk){
                if(info.data){
                    if(info.data.pws == user.pws){
                        //regenerate方法会重置(覆盖)当前的session
                        req.session.regenerate(function(){
                            console.log('密码比对成功！');
                            //存入redis服务器的的session数据
                            req.session.userid = info.data._id;
                            /*
                            res.cookie(name, value, options);
                            domain：cookie在什么域名下有效，类型为String,。默认为网站域名
                            expires: cookie过期时间，类型为Date。如果没有设置或者设置为0，那么该cookie只在这个这个session有效，即关闭浏览器后，这个cookie会被浏览器删除。
                            httpOnly: 只能被web server访问，类型Boolean。若设为true则js取不到结果
                            maxAge: 实现expires的功能，设置cookie过期的时间，类型为String，指明从现在开始，多少毫秒以后，cookie到期。
                            path: cookie在什么路径下有效，默认为'/'，类型为String
                            secure：只能被HTTPS使用，类型Boolean，默认为false
                            signed:使用签名，类型Boolean，默认为false。`express会使用req.secret来完成签名，需要cookie-parser配合使用`
                            */
                            //存入浏览器端的cookie
                            res.cookie('username',info.data.name, { expires: new Date(Date.now() + 60000*1000), httpOnly: false });
                            res.cookie('userid',info.data._id, { expires: new Date(Date.now() + 60000*1000), httpOnly: false });
                            //req.session.save();
                            //保存一下修改后的Session //res.redirect('/account');
                            data.msg ='成功';
                            res.json(data);
                        });
                        //这里必须注意密码验证成功后直接等待回调，但是必须return掉，防止重复执行res.json(data);报错
                        return;
                    }else{
                        data.msg ='密码错误';
                    }
                }else{
                    data.msg ='用户不存在';
                }
            }else{
                data.msg ='失败';
            }
            res.json(data);
        })
    },
    signout:function(req,res){
        //console.log(req.session.userid);
        res.clearCookie('username');
        res.clearCookie('userid');
        res.clearCookie('sessionid');
        req.session.destroy();//删除本地session
        res.json({isOK:true});
    },
    register:function(req,res){
        //console.log(req.session.userid);
        var user = {'name':req.body.name,'pws':req.body.pws};
        userdal.Save(user,function(info){
            res.json(info);return;
        });
    },
    userinfo:function(req,res){
        var data = {};
        var userid = req.session.userid;
        if(userid){
            userdal.findOne({_id:userid},function(info){
                data.isOk = true;
                if(info.isOk){
                    if(info.data){
                        data.msg ='成功';
                        data.data = info.data;
                        data.data.pws = '';
                    }else{
                        data.msg ='用户不存在';
                    }
                }else{
                    data.msg ='请求数据出错';
                }
                console.log(data);
                res.json(data);
            });
        }else{
            data.isOk = false;
            data.msg = '用户未登录';
            console.log(data);
            res.json(data);
        }
    }
}