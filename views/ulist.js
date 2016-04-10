define(['react','koala','Model','jsx!UserListComponent'],function(React,koala,Model,UserListComponent){
    koala.pageView.ulistView = koala.pageView.extend({
        tagName:'section',
        className:'koala_ulist',
        onCreate:function(){
            var UlistView = React.createFactory(UserListComponent);
            UlistView = UlistView({model:Model.userlistdb});
            React.render(UlistView,document.getElementsByClassName('koala_ulist')[0]);
            koala.iscroll('.koala_ulist');
        },
        onShow:function(){

        },
        onLoad:function(){

        },
        onHide:function(){

        },
        updateData:function (){
            //var userlist = Model.userlistdb.get();
        }
    });
    return koala.pageView.ulistView;
})
