/**
* Created by xuanfengchen on 16-3-23.
    */
/**
 * Created by Myco on 2016/3/12.
 */

//引入book数据表模型对象
var UserModel = require('../model/userModel');
//对外输出boook数据表的操作方法
module.exports = function(){
    function sendInfo(erro,result,loginfo,callback){
        var info = {};
        if (erro) {
            info.isOk = false;
            info.data = '操作失败辣';
            //console.log(loginfo+'失败：'+erro);
            //console.log(erro);
        } else {
            info.isOk = true;
            info.data = result;
            //console.log(loginfo+'成功！');
        }
        callback(info);
    }
    function getTime(){
        function RandomNum(Min,Max){
            var Range = Max - Min;
            var Rand = Math.random();
            var num = Min + Math.round(Rand * Range);
            return num;
        }
        return new Date().getTime()+ RandomNum(1000,2000);
    }
    return {
        //删除数据库数据
        //参数 bookobj 基础查询条件对象
        //返回消息状态对象
        Remove:function(bookobj,callback) {
            UserModel.remove({}, function (erro, result) {
                sendInfo(erro,result,'Remove',callback);
            })
        },
        //数据修改方法
        //参数 bookobj 基础查询条件对象
        //返回消息状态对象
        Update:function(bookobj,callback){
            //根据条件查询出要修改数据的主键_id
            var dataobj = this.findOne({id:bookobj.id});
            bookobj._id=dataobj._id;
            //被修改的数据必须被数据表对象实例化
            var bookModelObj = new UserModel(bookobj);
            UserModel.update(bookModelObj,function(erro,result){
                sendInfo(erro,result,'Update',callback);
            });
        },
        //数据新增方法
        //参数 bookobj 基础数据对象
        //返回消息状态对象
        Save:function(userobj,callback){
            UserModel.findOne({name:userobj.name},function(erro,result){
                var info = {};
                if(erro){
                    info.isOk = false;
                    info.data = '操作失败辣';
                    callback(info);return;
                }else if(result){
                    info.isOk = false;
                    info.data = '当前用户已存在';
                    callback(info);return;
                }else{
                    var userObj = new UserModel(userobj);
                    userObj.save(function(erro,result){
                        sendInfo(erro,result,'用户注册',callback);
                    })
                }
            })
        },
        findOne:function(userobj,callback){
            UserModel.findOne(userobj,function(erro,result){
                sendInfo(erro,result,'用户登录',callback);
            })
        }
    }
}();

