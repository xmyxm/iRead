define(['react','koala','Model','jsx!UcComponent'],function(React,koala,Model,UcComponent){
    koala.pageView.ucView = koala.pageView.extend({
        tagName:'section',
        className:'koala_uc',
        onCreate:function(){
            var UcView = React.createFactory(UcComponent);
            var	UcView = UcView({model:Model.bookdb,clevent:this.updateData});
            React.render(UcView,document.getElementsByClassName('koala_uc')[0]);
        },
        onShow:function(){

        },
        onLoad:function(){
            koala.iscroll('.page_uc');
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
    return koala.pageView.ucView;
})