define(['react','router'],function(React,router){
    var BookItem = React.createBackboneClass({
        link:function(event){
              //阻止默认事件
              event.preventDefault();
              //阻止事件冒泡
              event.stopPropagation();
              var bookid = this.refs.qq.getAttribute('data-bookid');
              router.navigate('#detail/'+ bookid);
        },
        render:function(){
            return(
                    React.createElement("li", {className: "oneBook", onClick: this.link, ref: "qq", "data-bookid": this.props.book.id}, 
                        React.createElement("a", null, 
                            React.createElement("img", {alt: this.props.book.title, className: "book_cover", src: this.props.book.src}), 
                            React.createElement("h2", {className: "book_title"}, this.props.book.title), 
                            React.createElement("p", {className: "author"}, "作者：", this.props.book.author), 
                            React.createElement("p", {className: "book_summary"}, this.props.book.content), 
                            React.createElement("div", {className: "book_price"}, 
                                React.createElement("del", null, "￥", this.props.book.price), 
                                React.createElement("span", {className: "book_currentPrice"}, "￥", this.props.book.currentPrice)
                            )
                        )
                    )
                );
            }
        });
    return BookItem;
})

