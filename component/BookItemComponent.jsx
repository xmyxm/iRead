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
                    <li className="oneBook" onClick={this.link} ref='qq' data-bookid={this.props.book.id}>
                        <a>
                            <img alt={this.props.book.title} className="book_cover" src={this.props.book.src} />
                            <h2 className="book_title">{this.props.book.title}</h2>
                            <p className="author">作者：{this.props.book.author}</p>
                            <p className="book_summary">{this.props.book.content}</p>
                            <div className="book_price">
                                <del>￥{this.props.book.price}</del>
                                <span className="book_currentPrice">￥{this.props.book.currentPrice}</span>
                            </div>
                        </a>
                    </li>
                );
            }
        });
    return BookItem;
})

