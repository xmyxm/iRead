define(['react','koala','Model','jsx!IndexComponent'],function(React,koala,Model,IndexComponent){
    koala.pageView.freeView = koala.pageView.extend({
        tagName:'section',
        className:'koala_free',
        onCreate:function(){
            var IndexListView = React.createFactory(IndexComponent);
            var	IndexListView = IndexListView({model:Model.bookdb,styleName:'page_free',clevent:this.updateData});
            React.render(IndexListView,document.getElementsByClassName('koala_free')[0]);
        },
        onShow:function(){

        },
        onLoad:function(){
            koala.iscroll('.page_free');
        },
        onHide:function(){

        },
        updateData:function (){
            var dt= Model.bookdb.get();
            dt[0].bookColName="新asddsd数据";
            Model.bookdb.set("bookdb",dt);
            alert('ds');
        }
    });
    return koala.pageView.freeView;
})