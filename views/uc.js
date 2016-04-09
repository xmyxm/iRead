define(['react','koala','Model','jsx!UcComponent'],function(React,koala,Model,UcComponent){
    koala.pageView.ucView = koala.pageView.extend({
        tagName:'section',
        className:'koala_uc',
        onCreate:function(){
            var options={
                type:'get',
                async:false,
                sucBack:function(sucdata){
                        Model.userdb=new koala.Model({storage:{
                            keyname: "userDB",
                            init: {
                                defaultData:sucdata.data
                            },
                            "lifeTime": "2D",
                            "maxSize": "2M",
                            "engine": ''
                        }
                    });
                    console.log(Model.userdb.get());
                    var UcView = React.createFactory(UcComponent);
                   	UcView = UcView({model:Model.userdb,clevent:this.updateData});
                    React.render(UcView,document.getElementsByClassName('koala_uc')[0]);
                    koala.iscroll('.page_uc');
                },
                errBack:function(errodata){console.log('请求失败，出错原因：'+JSON.stringify(errodata));}
            };
            koala.ajax("http://localhost:3000/userinfo",null,options);
        },
        onShow:function(){

        },
        onLoad:function(){

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