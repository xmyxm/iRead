define(["react","jsx!HeaderComponent","jsx!BookListAllComponent","jsx!ButtonListComponent","react.backbone"],function(React,Header,BookListAll,ButtonList){
    var BookExplainView = React.createBackboneClass({
              getInitialState: function() {
                return {BookData: this.props.model.get()};
              },
              render:function(){console.log(this.state.BookData);
                return(
                <div id="wrap">
                    <Header className="123" />
                    <ButtonList />
                    <BookListAll BookData = {this.state.BookData} styleName="page_rank"/>
                </div>
                );
            }
    });
    return BookExplainView;
})






