define(["react",'koala',"react.backbone"],function(React,onion){
var BookExplainView = React.createBackboneClass({
closeShare:function(){
   document.getElementById("bookshare").style.display="none";
},
render:function(){
	return (
		<div className="yd_webapp_share" onClick={this.closeShare} id="bookshare" style={{display:"none"}}>
			<div className="shareButtons">
				<p>分享</p>
				<div>
					<a className="qq"></a>
					<span></span>
					<a className="renren" data-fun="share"></a>
					<span></span>
					<a className="sina" data-fun="share"></a>
					<span></span>
					<a className="qqzone" data-fun="share"></a>
				</div>
			</div>
		</div>
		);
	}
});
return BookExplainView;
})






