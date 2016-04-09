define(["react",'koala','router'],function(React,koala,router){
var rollbackView = React.createBackboneClass({
    getDefaultProps : function () {
           return {
              btnTitle : '回退'
              };
         },
         goBack: function(){
             router.goBack();
         },
        render:function(){
             return(
               <h3 className="toolBar"><a onClick={this.goBack} className="return">{this.props.btnTitle}</a></h3>
        )}
    });
  return rollbackView;
})
