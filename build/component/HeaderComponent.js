define(["react",'koala'],function(React,koala){
var HeadExplainView = React.createBackboneClass({
    render:function(){
        return (
                React.createElement("div", {className: "ydtoolbar", id: "yd-header"}, 
                    React.createElement("div", {className: "baiduBtn btn", "data-fun": "goBaidu"}, "百度"), 
                    React.createElement("div", {className: "productBtn btn", "data-fun": "showProducts"}), 
                    React.createElement("div", {className: "backBtn btn", "data-fun": "hideProducts"}, "返回"), 
                    React.createElement("div", {className: "searchBtn btn", "data-fun": "search"}), 
                    React.createElement("div", {className: "naBtn btn", "data-fun": "native"}, "客户端")
                )
            );
        }
    });
    return HeadExplainView;
})



