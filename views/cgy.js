define(['react','koala','Model','jsx!CategoryComponent'],function(React,koala,Model,CategoryComponent){
    koala.pageView.categoryView = koala.pageView.extend({
        tagName:'section',
        className:'koala_cgy',
        onCreate:function(){
            var CategoryView = React.createFactory(CategoryComponent);
            var	CategoryView = CategoryView({model:Model.bookdb,clevent:this.updateData});
            React.render(CategoryView,document.getElementsByClassName('koala_cgy')[0]);
            console.log('cgy_render');
        },
        onShow:function(){

        },
        onLoad:function(){
            koala.iscroll('.page_cgy');
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
    return koala.pageView.categoryView;
})