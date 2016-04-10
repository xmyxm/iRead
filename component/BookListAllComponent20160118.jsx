define(["react","jsx!BookListComponent","react.backbone"],function(React,BookList){
var BookExplainView = React.createBackboneClass({
            getInitialState: function() {
            return {BookData: this.props.BookData};
            },
            render:function(){
                return (
                    <div id="page_container" className={this.props.styleName}>
                        <div className="columns" >
                            {
                                this.state.BookData.map(function(listAllData){
                                      return (<BookList listAllData={listAllData} />);
                                })
                            }
                        </div>
                    </div>
                    );
            }
});
return BookExplainView;
})






