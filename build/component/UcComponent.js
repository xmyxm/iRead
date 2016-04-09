define(["react","jsx!HeaderComponent","jsx!ButtonListComponent","react.backbone"],function(React,Header,ButtonList){
    var UcView = React.createBackboneClass({
              render:function(){
                return(
                React.createElement("div", {id: "wrap"}, 
                    React.createElement(Header, {className: "123"}), 
                    React.createElement(ButtonList, null), 
                    React.createElement(UserView, null)
                )
                );
            }
    });
    var UserView = React.createBackboneClass({
        render:function(){
            return (
                       React.createElement("div", {id: "page_container", className: "page_uc"}, 
                           React.createElement("div", {className: "usr", id: "userInfo"}, 
                           	React.createElement("p", {className: "userInfo app"}, 
                       		    	React.createElement("img", {src: "http://himg.bdimg.com/sys/portrait/item/e5b6436fe5b08fe9ad85e5bdb1702d.jpg"}), 
                       			    "Co小魅影 ", React.createElement("a", {href: "http://wappass.baidu.com/passport/"}, "退出"), React.createElement("br", null), 

                       			    React.createElement("span", null, "通知：已全面接入百度钱包支付，使用百度钱包可享1%返现优惠。")
                       		)
                           ), 
                       	    React.createElement("div", {className: "bookList"}, 
                       		    React.createElement("ul", {id: "async_list"}, 
                       	React.createElement("li", null, 
                       		React.createElement("a", {href: "/view/cbc74dfabe23482fb4da4cba?app=", title: "魔兽世界·战争罪行"}, 
                       			React.createElement("img", {alt: "我们青春都已落幕", 
                       			src: "./style/img/a50f4bfbfbedab647a830db8f136afc378311ed0.jpg"}), 
                       			React.createElement("h2", null, "我们青春都已落幕")
                       		)
                       	)
                       			)
                       		)
                       )
            )}
    });

return UcView;
})










