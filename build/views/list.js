/**
 * Created by xuanfengchen on 16-1-15.
 */
define(['react','koala','Model','jsx!IndexComponent'],function(React,koala,Model,IndexComponent){
    koala.pageView.listView = koala.pageView.extend({
        tagName:'section',
        onCreate:function(){
            var tmp = '<div id="content"></div>';
            this.$el.html(tmp);
            var IndexListView = React.createFactory(IndexComponent);
            var	IndexListView = IndexListView({model:Model.bookdb,clevent:this.updateData});
            React.render(IndexListView,document.getElementById('content'));
        },
        onShow:function(){console.log('onSHow');},
        onLoad:function(){console.log('onLoad');},
        onHide:function(){console.log('onHide');}
    });
    return koala.pageView.listView;
})