define(["react","koala","router"],function(React,koala,router){
var ButtonListView = React.createBackboneClass({
    render:function(){
         return(
            <nav>
                <ul className="i_nav">
                    <li><a href="#index" data-href="index" className="home">首页</a></li>
                    <li><a href="#rank" data-href="rank" onClick={this.goto} className="rank">排行</a></li>
                    <li><a href="#free" data-href="free" className="free">免费</a></li>
                    <li><a href="#cgy" data-href="cgy" className="cgy">分类</a></li>
                    <li><a href="#uc" data-href="uc" className="uc">个人</a></li>
                </ul>
                <div id="navStyle" className="home"><b></b></div>
            </nav>
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





