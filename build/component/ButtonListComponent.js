define(["react","koala","router"],function(React,koala,router){
var ButtonListView = React.createBackboneClass({
    render:function(){
         return(
            React.createElement("nav", null, 
                React.createElement("ul", {className: "i_nav"}, 
                    React.createElement("li", null, React.createElement("a", {href: "#index", "data-href": "index", className: "home"}, "首页")), 
                    React.createElement("li", null, React.createElement("a", {href: "#rank", "data-href": "rank", onClick: this.goto, className: "rank"}, "排行")), 
                    React.createElement("li", null, React.createElement("a", {href: "#free", "data-href": "free", className: "free"}, "免费")), 
                    React.createElement("li", null, React.createElement("a", {href: "#cgy", "data-href": "cgy", className: "cgy"}, "分类")), 
                    React.createElement("li", null, React.createElement("a", {href: "#uc", "data-href": "uc", className: "uc"}, "个人"))
                ), 
                React.createElement("div", {id: "navStyle", className: "home"}, React.createElement("b", null))
            )
            );
    },
    goto:function(event) {
       var obj = event.target;
       var href = obj.getAttribute("data-href");
       //阻止默认事件
       event.preventDefault();
       //阻止事件冒泡
       event.stopPropagation();
       router.navigate(href);
    }
});
return ButtonListView;
})





