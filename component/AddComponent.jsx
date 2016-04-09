define(["react",'koala',"jsx!RollbackComponent"],function(React,koala,RollbackComponent){
var addView = React.createBackboneClass({
    btnAjax:function(){
     var dataParam = {
          title:this.refs.title.getDOMNode().value,
          author:this.refs.author.getDOMNode().value,
          content:this.refs.content.getDOMNode().value,
          price:this.refs.price.getDOMNode().value,
          currentPrice:this.refs.currentPrice.getDOMNode().value,
          classify:this.refs.classify.getDOMNode().value
      };
        var obj = event.target;
        var url = obj.getAttribute("data-url");console.log(url);
        this.props.postData(dataParam,url);
    },
    getDefaultProps : function () {
      return {
        title : '<<李白>>'
      };
    },
    render:function(){
         return(
         <div className="wrap">
         <RollbackComponent />

         <div className="panel panel-default">
                       <div className="panel-heading">
                         <h3 className="panel-title">添加新书</h3>
                       </div>
                       <div className="panel-body">
                         <div className="input-group">
                               <div className="input-group-adr input-group-left">
                                     <span className="input-group-addon">title</span>
                               </div>
                               <div className="input-group-adr input-group-right">
                                     <input type="text" className="form-control" ref="title" placeholder="书名" aria-describedby="basic-addon1" />
                               </div>
                         </div>

                         <div className="input-group">
                               <div className="input-group-adr input-group-left">
                                     <span className="input-group-addon">author</span>
                               </div>
                               <div className="input-group-adr input-group-right">
                                     <input type="text" className="form-control" ref="author" placeholder="作者" aria-describedby="basic-addon1" />
                               </div>
                         </div>

                         <div className="input-group">
                               <div className="input-group-adr input-group-left">
                                    <span className="input-group-addon">content</span>
                               </div>
                               <div className="input-group-adr input-group-right">
                                     <input type="text" className="form-control" ref="content" placeholder="内容"  aria-describedby="basic-addon1" />
                              </div>
                         </div>

                         <div className="input-group">
                               <div className="input-group-adr input-group-left">
                                     <span className="input-group-addon">price</span>
                               </div>
                               <div className="input-group-adr input-group-right">
                                     <input type="text" className="form-control" ref="price" placeholder="售价" aria-describedby="basic-addon1" />
                               </div>
                         </div>

                         <div className="input-group">
                              <div className="input-group-adr input-group-left">
                                   <span className="input-group-addon">currentPrice</span>
                              </div>
                              <div className="input-group-adr input-group-right">
                                   <input type="text" className="form-control" ref="currentPrice" placeholder="当前售价" aria-describedby="basic-addon1" />
                              </div>
                         </div>

                           <div className="input-group">
                               <div className="input-group-adr input-group-left">
                                   <span className="input-group-addon">classify</span>
                               </div>
                               <div className="input-group-adr input-group-right">
                                   <select ref="classify">
                                       <option value="青春">青春</option>
                                       <option value="文学">文学</option>
                                       <option value="历史">历史</option>
                                       <option value="科幻">科幻</option>
                                       <option value="小说">小说</option>
                                       <option value="言情">言情</option>
                                       <option value="军事">军事</option>
                                   </select>
                               </div>
                           </div>

                         <button type="button" className="btn btn-info" data-url="bookadd" onClick={this.btnAjax}>ADD</button>
                           <button type="button" className="btn btn-info" data-url="bookdel" onClick={this.btnAjax}>DEL</button>
                           <button type="button" className="btn btn-info" data-url="bookUpdateByid" onClick={this.btnAjax}>UPD</button>
                           <button type="button" className="btn btn-info" data-url="bookfindOne" onClick={this.btnAjax}>Query</button>
                           <button type="button" className="btn btn-info" data-url="bookindex" onClick={this.btnAjax}>Queryindex</button>
                       </div>
                     </div>
          </div>
         );
    }
});
return addView;
})
