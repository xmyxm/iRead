define(['react','koala','Model','jsx!DetailComponent','jsx!ShareComponent'],function(React,koala,Model,DetailComponent,ShareComponent){
    koala.pageView.detailView = koala.pageView.extend({
	tagName:'section',
    className:'koala_detail',
	onCreate:function(params){
	},
	onShow:function(){
		var detailView = React.createFactory(DetailComponent);
		detailView = detailView({model:Model.bookdb,bookid:this.params.bookid});
		React.render(detailView,document.getElementsByClassName('koala_detail')[0]);
	},
	onLoad:function(){},
	onHide:function(){}
});
return koala.pageView.detailView;
})