/**
 * Created by Myco on 2016/3/12.
 */

//引入book数据表模型对象
var BookModel = require('../model/bookModel');
//对外输出boook数据表的操作方法
module.exports = function(){
    function sendInfo(erro,result,loginfo,callback){
        var info = {};
        if (erro) {
            info.isOk = false;
            info.data = '操作失败辣';
            console.log(loginfo+'失败：'+erro);
            console.log(erro);
        } else {
            info.isOk = true;
            info.data = result;
            console.log(loginfo+'成功！');
        }
        callback(info);
    }
    function getDate(){
        var dateObj = new Date();
        var strDate = ''+dateObj.getYear();
        if(dateObj.getMonth()<10){
            strDate += '0';
        }
        strDate += dateObj.getMonth();
        if(dateObj.getDate()<10){
            strDate += '0';
        }
        strDate += dateObj.getDate();
        if(dateObj.getHours()<10){
            strDate += '0';
        }
        strDate += dateObj.getHours();
        if(dateObj.getMinutes()<10){
            strDate += '0';
        }
        strDate += dateObj.getMinutes();
        if(dateObj.getSeconds()<10){
            strDate += '0';
        }
        strDate += dateObj.getSeconds();
        if(dateObj.getMilliseconds()<10){
            strDate += '0';
        }
        strDate += dateObj.getMilliseconds();
        return strDate;
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
            BookModel.remove({}, function (erro, result) {
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
            var bookModelObj = new BookModel(bookobj);
            BookModel.update(bookModelObj,function(erro,result){
                sendInfo(erro,result,'Update',callback);
            });
        },
        //数据新增方法
        //参数 bookobj 基础数据对象
        //返回消息状态对象
        Save:function(bookobj,callback){
             bookobj.id = getTime();
             var bookObj = new BookModel(bookobj);
             bookObj.save(function(erro,result){
                sendInfo(erro,result,'Save',callback);
            })
        },
        findOne:function(_bookobj,callback){
            console.log(_bookobj);
             BookModel.findOne(_bookobj,function(erro,result){
                sendInfo(erro,result,'findOne',callback);
            })
        },
        findList:function(_bookobj,callback){
            var query = BookModel.find({});
            query.skip(1);
            query.limit(2);
            query.exec(function(erro,result){
                return sendInfo(erro,result,'findList',callback);
            });
/*            console.log('找到执行方法');
            return BookModel.where('id').gte(_bookobj.id);*/
        },
        bookindex:function(callback){
            BookModel.find({classify:'青春'})
                .sort({'meta.updateDate':'desc'})
                .limit(2)
                .exec()
                .then(function(qcdata){
                    var bookdata = [];
                    if(qcdata){
                        var itemObj = {};
                        itemObj.bookColName = '1.99特价区';
                        itemObj.categoryId = 1000;
                        itemObj.booklist = qcdata;
                        bookdata.push(itemObj);
                    }
                    return bookdata;
                }).then(function(bookdata){
                    BookModel.find({classify:'文学'})
                        .limit(2)
                        .exec()
                        .then(function(wxdata){
                            //console.log(wxdata);
                            if(wxdata){
                                var itemObj = {};
                                itemObj.bookColName = '文学';
                                itemObj.categoryId = 2000;
                                itemObj.booklist = wxdata;
                                bookdata.push(itemObj);
                            }
                            return bookdata;
                        })
                        .then(function(bookdata){
                            console.log('科幻');
                            BookModel.find({classify:'科幻'})
                                .limit(2)
                                .exec()
                                .then(function(khdata){
                                    //console.log(khdata);
                                    if(khdata){
                                        var itemObj = {};
                                        itemObj.bookColName = '科幻';
                                        itemObj.categoryId = 3000;
                                        itemObj.booklist = khdata;
                                        bookdata.push(itemObj);
                                    }
                                    return bookdata;
                                }).then(function(bookdata){console.log(bookdata);
                                    callback(bookdata)
                                    return;});
                        })
                })

        }
        /*
         .where('age').gte(25)
         .where('tags').in(['movie', 'music', 'art'])
         .select('name', 'age', 'tags')
         .skip(20)
         .limit(10)
         .asc('age')
         .slaveOk()
         .hint({ age: 1, name: 1 })
         .run(callback);
        */
    }
}();

