define(["react","jsx!HeaderComponent","jsx!BookListAllComponent","jsx!ButtonListComponent","react.backbone"],function(React,Header,BookListAll,ButtonList){
    var columnListView = React.createBackboneClass({
              getInitialState: function() {
                return {BookData: this.props.model.get()};
              },
              render:function(){
                return(
                    <div id="wrap">
                        <Header className="123" />
                        <ButtonList />
                        <article className={this.props.styleName}>
                        <div>
                            <ImgListView />
                            <BookListAll BookData = {this.state.BookData}/>
                            </div>
                        </article>
                    </div>
                );
            },
            fnalert:function(){
            this.state.collistData[0].bookColName="新数据";
            this.setState(this.state.collistData);
            alert('fn');
            }
    });

    var ImgListView = React.createBackboneClass({
        render:function(){
            return (
                    <div className="carouselWrap app" id="carouselWrap">
                        <ul style={{backgroundColor:'#edece3'}}>
                                <li>
                                    <a href="http://yd.baidu.com/ydnode/tushu/multiTopicDetail.html?h5v=4#columnId=5037">
                                        <img src="http://img.baidu.com/img/iknow/wenku/2015ccbnd640x254.jpg" />
                                    </a>
                                </li>
                                <li>
                                    <a href="http://yd.baidu.com/ydnode/tushu/multiTopicDetail.html?h5v=4#columnId=5036">
                                        <img src="http://img.baidu.com/img/iknow/wenku/pdliangxing640x254.jpg" />
                                    </a>
                                </li>
                                <li>
                                    <a href="http://yd.baidu.com/ydnode/tushu/multiTopicDetail.html?h5v=4#columnId=5035">
                                        <img src="http://img.baidu.com/img/iknow/wenku/pdjglz640x254.jpg" />
                                    </a>
                                </li>
                                <li>
                                    <a href="/topic/tid/6161?fr=banner">
                                         <img src="http://img.baidu.com/img/iknow/wenku/cxb20150113640x254.jpg" />
                                    </a>
                                </li>
                                <li>
                                    <a href="http://yd.baidu.com/ydnode/tushu/multiTopicDetail.html?h5v=4#columnId=5034">
                                        <img src="http://img.baidu.com/img/iknow/wenku/lsxspandian640x254.jpg" />
                                    </a>
                                </li>
                            </ul>
                        <div>
                        <b class=""></b>
                                    <b class=""></b>
                                    <b class="on"></b>
                                    <b class=""></b>
                                    <b class=""></b>
                        </div>
                    </div>
            )}
    });
return columnListView;
})







