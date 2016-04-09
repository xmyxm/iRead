define(["react","jsx!BookItemComponent","react.backbone"],function(React,BookItem){
var BookList = React.createBackboneClass({
            getInitialState: function() {
            return {listAllData: this.props.listAllData};
            },
            render:function(){
            var listAllData = this.props.listAllData;
            var categoryIdLink='#/col/'+listAllData.categoryId;
            return(
                    <div className="col" >
                        <p className="title">
                            <span>{listAllData.bookColName}</span>
                            <a href={categoryIdLink}>全部</a>
                        </p>
                            <div className="col_book_list">
                                <ul>
                                {
                                    listAllData.booklist.map(function(book) {
                                    return (
                                        <BookItem book={book} />
                                       );
                                    })
                                }
                                </ul>
                            </div>
                    </div>
            );
            }
});
return BookList;
})