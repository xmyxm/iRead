define(["react","jsx!HeaderComponent","jsx!BookListAllComponent","jsx!ButtonListComponent","react.backbone"],function(React,Header,BookListAll,ButtonList){
    var BookExplainView = React.createBackboneClass({
              getInitialState: function() {
                return {BookData: this.props.model.get()};
              },
              render:function(){console.log(this.state.BookData);
                return(
                React.createElement("div", {id: "wrap"}, 
                    React.createElement(Header, {className: "123"}), 
                    React.createElement(ButtonList, null), 
                    React.createElement(BookListAll, {BookData: this.state.BookData, styleName: "page_rank"})
                )
                );
            }
    });
    return BookExplainView;
})






