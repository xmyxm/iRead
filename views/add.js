define(['react','koala','Model','jsx!AddComponent'],function(React,koala,Model,AddComponent){
    koala.pageView.addView = koala.pageView.extend({
    tagName:'section',
    className:'koala_add',
	onCreate:function(){
			var FormView = React.createFactory(AddComponent);
		    FormView = FormView({postData:this.postData,price:12});
			React.render(FormView,document.getElementsByClassName('koala_add')[0]);
		},
	onShow:function(){console.log('onSHow');},
	onLoad:function(){console.log('onLoad');},
	onHide:function(){console.log('onHide');},
	postData:function(dataParam,url){
        console.log(dataParam);
        var options={
            type:'post',
            sucBack:function(sucdata){console.log('请求成功，返回结果：'+JSON.stringify(sucdata));},
            errBack:function(errodata){console.log('请求失败，出错原因：'+JSON.stringify(errodata));}
        };
        koala.ajax("http://localhost:3000/"+url,dataParam,options);

           var Router = new koala.Router();
           //Router.doAction('indexView');
	        var book = new koala.Model({
	            storage:{
	                keyname: "bookItemDB",
	                init: {
	                    defaultData: dataParam,
	                    "lifeTime": "2D",
	                    "maxSize": "2M",
	                    "engine": sessionStorage
	                }
	            }
	        }); 
    }
});
return koala.pageView.addView;
})