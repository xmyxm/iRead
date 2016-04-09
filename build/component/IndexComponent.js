define(["react","jsx!HeaderComponent","jsx!BookListAllComponent","jsx!ButtonListComponent","react.backbone"],function(React,Header,BookListAll,ButtonList){
    var columnListView = React.createBackboneClass({
              getInitialState: function() {
                return {BookData: this.props.model.get()};
              },
              render:function(){
                return(
                React.createElement("div", {id: "wrap"}, 
                    React.createElement(Header, {className: "123"}), 
                    React.createElement(ButtonList, null), 
                    React.createElement("article", {className: this.props.styleName}, 
                    React.createElement("div", null, 
                        React.createElement(ImgListView, null), 
                        React.createElement(BookListAll, {BookData: this.state.BookData})
                        )
                    )
                )
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
                    React.createElement("div", {className: "carouselWrap app", id: "carouselWrap"}, 
                        React.createElement("ul", {style: {backgroundColor:'#edece3'}}, 
                                React.createElement("li", null, 
                                    React.createElement("a", {href: "http://yd.baidu.com/ydnode/tushu/multiTopicDetail.html?h5v=4#columnId=5037"}, 
                                        React.createElement("img", {src: "http://img.baidu.com/img/iknow/wenku/2015ccbnd640x254.jpg"})
                                    )
                                ), 
                                React.createElement("li", null, 
                                    React.createElement("a", {href: "http://yd.baidu.com/ydnode/tushu/multiTopicDetail.html?h5v=4#columnId=5036"}, 
                                        React.createElement("img", {src: "http://img.baidu.com/img/iknow/wenku/pdliangxing640x254.jpg"})
                                    )
                                ), 
                                React.createElement("li", null, 
                                    React.createElement("a", {href: "http://yd.baidu.com/ydnode/tushu/multiTopicDetail.html?h5v=4#columnId=5035"}, 
                                        React.createElement("img", {src: "http://img.baidu.com/img/iknow/wenku/pdjglz640x254.jpg"})
                                    )
                                ), 
                                React.createElement("li", null, 
                                    React.createElement("a", {href: "/topic/tid/6161?fr=banner"}, 
                                         React.createElement("img", {src: "http://img.baidu.com/img/iknow/wenku/cxb20150113640x254.jpg"})
                                    )
                                ), 
                                React.createElement("li", null, 
                                    React.createElement("a", {href: "http://yd.baidu.com/ydnode/tushu/multiTopicDetail.html?h5v=4#columnId=5034"}, 
                                        React.createElement("img", {src: "http://img.baidu.com/img/iknow/wenku/lsxspandian640x254.jpg"})
                                    )
                                )
                            ), 
                        React.createElement("div", null, 
                        React.createElement("b", {class: ""}), 
                                    React.createElement("b", {class: ""}), 
                                    React.createElement("b", {class: "on"}), 
                                    React.createElement("b", {class: ""}), 
                                    React.createElement("b", {class: ""})
                        )
                    )
            )}
    });
return columnListView;
})







