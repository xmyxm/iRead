define(["react","jsx!BookItemComponent","react.backbone"],function(React,BookItem){
var BookList = React.createBackboneClass({
            getInitialState: function() {
            return {listAllData: this.props.listAllData};
            },
            render:function(){
            var listAllData = this.props.listAllData;
            var categoryIdLink='#/col/'+listAllData.categoryId;
            return(
                    React.createElement("div", {className: "col"}, 
                        React.createElement("p", {className: "title"}, 
                            React.createElement("span", null, listAllData.bookColName), 
                            React.createElement("a", {href: categoryIdLink}, "全部")
                        ), 
                            React.createElement("div", {className: "col_book_list"}, 
                                React.createElement("ul", null, 
                                
                                    listAllData.booklist.map(function(book) {
                                    return (
                                        React.createElement(BookItem, {book: book})
                                       );
                                    })
                                
                                )
                            )
                    )
            );
            }
});
return BookList;
})