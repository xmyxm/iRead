define(["react",'koala',"react.backbone"],function(React,onion){
var ButtonListView = React.createBackboneClass({
    btnAjax:function(){
     var dataParam = {
          title:this.refs.title.getDOMNode().value,
          author:this.refs.author.getDOMNode().value,
          content:this.refs.content.getDOMNode().value,
          price:this.refs.price.getDOMNode().value,
          currentPrice:this.refs.currentPrice.getDOMNode().value
      };
      console.log(dataParam);
      this.props.postData(dataParam);
    },
     propTypes: {
      price:React.PropTypes.number,
      title: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number]),
      content: function(props, propName, componentName) {
        console.log(props+':'+propName+':'+componentName);
      if (!/matchme/.test(props[propName])) {
        return new Error('Validation failed!');
      }
    }
    },
    getDefaultProps : function () {
      return {
        title : '<<李白>>'
      };
    },
    render:function(){
      var price=this.props.price;
      //var book = {title:"署名测试",content:"书名内容",price:"fgf"};
         return(
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Panel title</h3>
              </div>
              <div className="panel-body">
                <div className="input-group">
                  <span className="input-group-addon">title</span>
                  <input type="text" className="form-control" ref="title" placeholder="书名" value={this.props.title} aria-describedby="basic-addon1" />
                </div>
                <br></br>
                <div className="input-group">
                  <span className="input-group-addon">author</span>
                  <input type="text" className="form-control" ref="author" placeholder="作者" aria-describedby="basic-addon1" />
                </div>
                <br></br>
                <div className="input-group">
                  <span className="input-group-addon">content</span>
                  <input type="text" className="form-control" ref="content" placeholder="内容"  aria-describedby="basic-addon1" />
                </div>
                <br></br>
                <div className="input-group">
                  <span className="input-group-addon">price</span>
                  <input type="text" className="form-control" ref="price" placeholder="售价" value={price}  aria-describedby="basic-addon1" />
                </div>
                <br></br>
                <div className="input-group">
                  <span className="input-group-addon">currentPrice</span>
                  <input type="text" className="form-control" ref="currentPrice" placeholder="当前售价" aria-describedby="basic-addon1" />
                </div>
                <br></br>
                <button type="button" className="btn btn-info" onClick={this.btnAjax}>OK</button>
              </div>
            </div>
            );
    }
});
return ButtonListView;
})
