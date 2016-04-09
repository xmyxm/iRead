/**
 * Created by sqsun on 2015/9/22.
 */
define(["koala"],function(koala){
    var appRouter = koala.Router.extend({
        // 路由配置
        routes: {
            '': 'index'
            ,'index': 'index'
            ,'rank': 'rank'
            ,'free':'free'
            ,'cgy':'cgy'
            ,'add':'add'
            ,'uc':'uc'
            ,'msg':'msg'
            ,'detail/:bookid':'detail'
            ,'list/:id':'list'
            ,'login':'login'
            ,'*i':'index'
        }
        //配置是否使用loading
        ,loading:$('#ui-loading')
        //配置页面切换顺序
        ,pageOrder:['indexView', 'rankView','freeView','detailView',"categoryView","ucView",'addView','loginView','msgView']
        ,index: function(title) {
            this.doAction('indexView', {});
        }
        ,list:function(){
            this.doAction('listView', {});
        }
        ,rank: function() {
            this.doAction('rankView', {});
        }
        ,free:function(){
            this.doAction('freeView');
        }
        ,cgy:function(){
            this.doAction('categoryView');
        }
        ,uc:function(){
            this.doAction('ucView');
        }
        ,add:function(){
            this.doAction('addView');
        }
        ,detail:function(bookid){
            this.doAction('detailView',{bookid:bookid});
        }
        ,login:function(){
            this.doAction('loginView');
        }
        ,msg:function(){
            this.doAction('msgView');
        }
    });
    return new appRouter();
})
