define(['react','koala','Model','jsx!IndexComponent'],function(React,koala,Model,IndexComponent){
    koala.pageView.indexView = koala.pageView.extend({
	tagName:'section',
    className:'koala_index',
	onCreate:function(){console.log('index的onCreate方法');
        var options={
            type:'post',
            async:false,
            sucBack:function(sucdata){
                Model.bookdb=new koala.Model({storage:{
                        keyname: "bookDB",
                        init: {
                            defaultData:sucdata
                        },
                        "lifeTime": "2D",
                        "maxSize": "2M",
                        "engine": ''
                    }
                 });
                var IndexListView = React.createFactory(IndexComponent);
                var	IndexListView = IndexListView({model:Model.bookdb,styleName:'page_index',clevent:this.updateData});
                React.render(IndexListView,document.getElementsByClassName('koala_index')[0]);
                koala.iscroll('.page_index');
            },
            errBack:function(errodata){console.log('请求失败，出错原因：'+JSON.stringify(errodata));}
        };
        koala.ajax("http://localhost:3000/bookindex",null,options);
	},
	onShow:function(){
        console.log('index的onShow方法');
    },
	onLoad:function(){
        console.log('index的onLoad方法');
        console.log(document.getElementsByClassName('page_index'));
    },
	onHide:function(){
        console.log('index的onHide方法');
    },
    updateData:function (){
        var dt= Model.bookdb.get();
        dt[0].bookColName="新asddsd数据";
        Model.bookdb.set("bookdb",dt);
        alert('ds');
    }
});
return koala.pageView.indexView;
})