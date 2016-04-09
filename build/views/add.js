define(['react','koala','Model','jsx!FormDataComponent'],function(React,koala,Model,FormDataComponent){
    koala.pageView.addView = koala.pageView.extend({
	tagName:'article',
	onCreate:function(){
		var tmp ='<div id="header"></div>'+
				'<div id="content"></div>'+
				'<div id="footer"></div>';
			this.$el.html(tmp);
			var FormView = React.createFactory(FormDataComponent);
		    FormView = FormView({postData:this.postData,price:12});
			React.render(FormView,this.$el.find('#content')[0]);			
		},
	onShow:function(){console.log('onSHow');},
	onLoad:function(){console.log('onLoad');},
	onHide:function(){console.log('onHide');},
	postData:function(dataParam){
        koala.ajax("https://www.baidu.com/",dataParam,'get');
                alert(dataParam);
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
return onion.pageView.addView;
})