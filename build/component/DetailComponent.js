define(["react",'koala','jsx!ShareComponent','router',"react.backbone"],function(React,koala,ShareComponent,router){
var BookExplainView = React.createBackboneClass({
 getDefaultProps : function () {
       return {explain:{
            title : '书名',
            price:'23(价格)',
            author:'作者',
            rq:'554(阅读量)',
            currentPrice:'21.9(当前售价)',
            src:'',
         }
       };
     },
    getInitialState: function() {
    return {
            summary:true,//简介
            catalogue:false,//目录
            comments:false//评论
        };
    },
     conversion:function(event){
        var obj = event.target;
        var name = obj.getAttribute("data-name");
        var state = { summary:true,catalogue:false,comments:false};
        switch(name){
            case 'summary':
                state.summary = true;
                state.catalogue = false;
                state.comments = false;
                break;
            case 'catalogue':
                state.summary = false;
                state.catalogue = true;
                state.comments = false;
                break;
            case 'comments':
                state.summary = false;
                state.catalogue = false;
                state.comments = true;
                break;

        }
        this.setState(state);
     },
     addbookshelf:function(event){
        var obj = event.target;
        if(obj.text == "加入书架"){
            obj.text = "移除书架";
            obj.className = "rmv";
        }else{
            obj.text = "加入书架";
            obj.className = "fav";
        }
     },
     MyShare:function(){
         document.getElementById("bookshare").style.display = "block";
     },
     goBack: function(){
         router.goBack();
     },
    render:function(){
            var data = this.props.model.get();
            var bookid = this.props.bookid;
            var book={};
            if(data){
                for(var i= 0,l=data.length;i<l;i++){
                    data[i].booklist.forEach(function(item,index){
                        if(item.id == bookid){
                            book = item;
                            return;
                        }
                    });
                }
            }
      var explain= book || this.props.explain;
         return(
                React.createElement("div", null, 
                        React.createElement("h3", {className: "toolBar"}, React.createElement("a", {onClick: this.goBack, className: "return"}, "返回")), 
                        React.createElement("div", {className: "bookInfo"}, 
                            React.createElement("div", {className: "info"}, 
                                React.createElement("a", {href: "#"}, 
                                    React.createElement("img", {src: explain.src})
                                ), 
                                React.createElement("div", {className: "name_author"}, 
                                    React.createElement("p", {className: "name"}, explain.title), 
                                    React.createElement("p", {className: "author"}, "作者：", explain.author)
                                ), 
                                React.createElement("div", {className: "star"}, 
                                    React.createElement("div", {style: {width: "98%"}})
                                ), 
                                React.createElement("p", {className: "num_size"}, explain.rq, "人阅读"), 
                                React.createElement("p", {className: "price"}, "纸书：", React.createElement("del", null, "￥", explain.price)), 
                                React.createElement("p", {className: "price"}, 
                                    "现价：￥", explain.currentPrice, 
                                    React.createElement("span", {className: "discount"}, "0.6折")
                                )
                            ), 
                            React.createElement("div", {className: "btns"}, 
                                React.createElement("button", {"data-href": "/view/cbc74dfabe23482fb4da4cba?cooperate=", className: "yellow w1"}, "免费试读"), 
                                React.createElement("span", {className: "blank"}), 
                                React.createElement("button", {className: "gray w1", "data-type": "normal", "data-docid": "cbc74dfabe23482fb4da4cba"}, "购买")
                            ), 
                            React.createElement("div", {className: "fav_apk_share two"}, 
                                React.createElement("span", null), 
                                React.createElement("a", {onClick: this.addbookshelf, className: "fav"}, "加入书架"), 
                                React.createElement("span", null), 
                                React.createElement("a", {className: "share", onClick: this.MyShare}, "分享"), 
                                React.createElement("span", {className: "hide"})
                            )
                        ), 


                        React.createElement("div", {className: "intro_cat_cmts"}, 
                            React.createElement("div", {className: "title app", onClick: this.conversion}, 
                                React.createElement("span", {className: this.state.summary == true ? "on" : "", "data-name": "summary"}, "简介"), 
                                React.createElement("span", {className: this.state.catalogue == true ? "on" : "", "data-name": "catalogue"}, "目录"), 
                                React.createElement("span", {className: this.state.comments == true ? "on" : "", "data-name": "comments"}, "评论(138)")
                            ), 
                            React.createElement("ul", {id: "intro_cat_cmts"}, 
                                React.createElement("li", {className: "summary", style: {display:this.state.summary == true ? "block":"none"}}, 
                                    React.createElement("div", {id: "summary-box", style: {height: '180px'}}, 
                                        "奥格瑞玛的流血结束了。", React.createElement("br", null), React.createElement("br", null), "　　联盟和部落共同剥夺了加尔鲁什·地狱咆哮的酋长职位。现在，他已经成为" + ' ' +
                                        "艾泽拉斯最受唾弃的人物。他的征服欲望毁灭了众多城市，几乎导致部落分裂。无数生命因此而化为乌有……", React.createElement("br", null), React.createElement("br", null), "　　现在，在传说中的潘达利亚大陆，他将为自己的罪行而接受审判。全世界的著名" + ' ' +
                                        "领袖们将聚集一堂，见证这历史性的事件。随着审判开始，青铜龙军团的使者们向世人呈现出加尔鲁什令人惊骇的暴行。对于许多出席审判的人，这些历史的闪回迫使他们重拾自己充满痛苦的回忆，甚至不" + ' ' +
                                        "得不质疑自己是无辜抑或有罪。对他人而言，这些令人战栗的罪行更是激起了他们憎恨的怒火。"
                                    ), 
                                    React.createElement("p", {className: "more"}, "查看更多")
                                ), 
                                React.createElement("li", {className: "cat", style: {display:this.state.catalogue == true ? "block":"none"}}, 
                                    React.createElement("div", {id: "cat-container", style: {height: "auto"}}, 
                                        React.createElement("p", {href: "#", "data-href": "1-1", "data-level": "1", className: "orange w1"}, "序"), 
                                        React.createElement("p", {href: "#", "data-href": "2-1", "data-level": "1", className: "orange w1"}, "第一章"), 
                                        React.createElement("p", {href: "#", "data-href": "3-1", "data-level": "1", className: "orange w1"}, "第二章"), 
                                        React.createElement("p", {href: "#", "data-href": "4-1", "data-level": "1", className: "orange w1"}, "第三章"), 
                                        React.createElement("p", {href: "#", "data-href": "5-1", "data-level": "1", className: "orange w1"}, "第四章"), 
                                        React.createElement("p", {href: "#", "data-href": "6-1", "data-level": "1", className: "orange w1"}, "第五章"), 
                                        React.createElement("p", {href: "#", "data-href": "7-1", "data-level": "1", className: "orange w1"}, "第六章"), 
                                        React.createElement("p", {href: "#", "data-href": "8-1", "data-level": "1", className: "orange w1"}, "第七章"), 
                                        React.createElement("p", {href: "#", "data-href": "9-1", "data-level": "1", className: "orange w1"}, "第八章"), 
                                        React.createElement("p", {href: "#", "data-href": "10-1", "data-level": "1", className: "orange w1"}, "第九章"), 
                                        React.createElement("p", {href: "#", "data-href": "11-1", "data-level": "1", className: "orange w1"}, "第十章"), 
                                        React.createElement("p", {href: "#", "data-href": "12-1", "data-level": "1", className: "orange w1"}, "第十一章"), 
                                        React.createElement("p", {href: "#", "data-href": "13-1", "data-level": "1", className: "orange w1"}, "第十二章"), 
                                        React.createElement("p", {href: "#", "data-href": "14-1", "data-level": "1", className: "orange w1"}, "第十三章"), 
                                        React.createElement("p", {href: "#", "data-href": "15-1", "data-level": "1", className: "orange w1"}, "第十四章"), 
                                        React.createElement("p", {href: "#", "data-href": "16-1", "data-level": "1", className: "orange w1"}, "第十五章"), 
                                        React.createElement("p", {href: "#", "data-href": "17-1", "data-level": "1", className: "orange w1"}, "第十六章"), 
                                        React.createElement("p", {href: "#", "data-href": "18-1", "data-level": "1", className: "orange w1"}, "第十七章"), 
                                        React.createElement("p", {href: "#", "data-href": "19-1", "data-level": "1", className: "orange w1"}, "第十八章"), 
                                        React.createElement("p", {href: "#", "data-href": "20-1", "data-level": "1", className: "orange w1"}, "第十九章"), 
                                        React.createElement("p", {href: "#", "data-href": "21-1", "data-level": "1", className: "orange w1"}, "第二十章"), 
                                        React.createElement("p", {href: "#", "data-href": "22-1", "data-level": "1", className: "orange w1"}, "第二十一章"), 
                                        React.createElement("p", {href: "#", "data-href": "39-1", "data-level": "1", className: "orange w1"}, "尾声")
                                    ), 
                                    React.createElement("p", {class: "more"}, "查看更多")
                                ), 
                                React.createElement("li", {className: "comments", style: {display:this.state.comments == true ? "block":"none"}}, 
                                    React.createElement("div", {className: "cmts"}, 
                                        React.createElement("div", {className: "totalcmt"}, 
                                            React.createElement("strong", null, "综合评分"), 
                                            React.createElement("div", {className: "star"}, 
                                                React.createElement("div", {className: "range"}, React.createElement("div", {style: {width: "98%"}})), 
                                                React.createElement("span", null, "9.8分")
                                            ), 
                                            React.createElement("em", {className: "cmtNums"}, "（138人评价）")
                                        ), 
                                        React.createElement("div", {className: "douban_zmazon"}
                                        ), 

                                        React.createElement("ul", {className: "cmtslist"}, 

                                            React.createElement("li", null, 
                                                React.createElement("p", {className: "cmttitle"}), 
                                                React.createElement("div", {className: "star"}, 
                                                    React.createElement("div", {className: "range"}, React.createElement("div", {style: {width: "100%"}})), 
                                                    React.createElement("span", null, "徐鑫Elisa 2015-11-19")
                                                ), 
                                                React.createElement("div", {className: "cmtContent"}, "经典玩家必看"), 
                                                React.createElement("p", {className: "cmtMore", style: {display: "none"}}, "查看更多")
                                            ), 

                                            React.createElement("li", null, 
                                                React.createElement("p", {className: "cmttitle"}, "故事引人入胜，讲述了地狱咆哮受审的过程"), 
                                                React.createElement("div", {className: "star"}, 
                                                    React.createElement("div", {className: "range"}, React.createElement("div", {style: {width: "100%"}})), 
                                                    React.createElement("span", null, "翻译质量问题 2015-10-26")
                                                ), 
                                                React.createElement("div", {className: "cmtContent"}, "不过翻译质量来说，没有民间翻译来的精彩。 "), 
                                                React.createElement("p", {className: "cmtMore", style: {display: "none"}}, "查看更多")
                                            ), 

                                            React.createElement("li", null, 
                                                React.createElement("p", {className: "cmttitle"}, "魔兽世界..."), 
                                                React.createElement("div", {className: "star"}, 
                                                    React.createElement("div", {className: "range"}, React.createElement("div", {style: {width: "100%"}})), 
                                                    React.createElement("span", null, "郑晨炜 2015-10-16")
                                                ), 
                                                React.createElement("div", {className: "cmtContent"}, "很喜欢的一本书·很喜欢魔兽世界陪伴我很多年了·希望它一直好下去 "), 
                                                React.createElement("p", {className: "cmtMore", style: {display: "none"}}, "查看更多")
                                            ), 

                                            React.createElement("li", null, 
                                                React.createElement("p", {className: "cmttitle"}, "很不错，虽然短了点"), 
                                                React.createElement("div", {className: "star"}, 
                                                    React.createElement("div", {className: "range"}, React.createElement("div", {style: {width: "100%"}})), 
                                                    React.createElement("span", null, "fxr 2015-09-24")
                                                ), 
                                                React.createElement("div", {className: "cmtContent"}, "有点短，不过很精彩，期待更多相关作品 "), 
                                                React.createElement("p", {className: "cmtMore", style: {display: "none"}}, "查看更多")
                                            ), 

                                            React.createElement("li", null, 
                                                React.createElement("p", {className: "cmttitle"}, "加尔鲁什..."), 
                                                React.createElement("div", {className: "star"}, 
                                                    React.createElement("div", {className: "range"}, React.createElement("div", {style: {width: "100%"}})), 
                                                    React.createElement("span", null, "Damon 2015-08-15")
                                                ), 
                                                React.createElement("div", {className: "cmtContent", style: {height: "96px"}}, 
                                                    "作为一名魔兽的玩家，对魔兽系列一直很感兴趣，作为一名联盟成员，玩了一个潜行者，野外不停地杀" + ' ' +

                                                    "部落，这本书写的很真挚，结尾真实出乎意料，估计没人会猜到，加尔鲁什还是得到了宽恕，结尾时，他通过时光之象来到了纳兰格，他昔日的故乡，似乎让他开始反省自己的错误，还是那句话：人是可以" + ' ' +

                                                    "改变的！"
                                                ), 
                                                React.createElement("p", {className: "cmtMore", style: {display: "block"}}, "查看更多")
                                            )

                                        ), 
                                        React.createElement("a", {href: "/ebook/cbc74dfabe23482fb4da4cba?type=comments", className: "allCmts"}, "查看所有评论(138)")
                                    )
                                )
                            )
                        ), 
                        
                        React.createElement("div", {id: "async"}, 
                            React.createElement("div", {className: "rmcd"}, 
                                React.createElement("p", {className: "mode_title"}, "相关推荐"), 
                                React.createElement("ul", null, 
                                    React.createElement("li", {className: "rcmd-one-book", "data-href": "/ebook/4e2c97ec2e3f5727a5e962be"}, 
                                        React.createElement("img", {src: "./style/img/c8ea15ce36d3d539f33b353e3c87e950342ab0cc.jpg"}), 
                                        React.createElement("p", {className: "name"}, "星际争霸Ⅱ：恶魔契约"), 
                                        React.createElement("p", {className: "author"}, "作者：克里斯蒂·高登"), 
                                        React.createElement("div", {className: "score"}, 
                                            React.createElement("div", {className: "star"}, 
                                                React.createElement("div", {className: "range"}, React.createElement("div", {style: {width: "95%"}}))
                                            ), 
                                            React.createElement("span", null, "28人阅读")
                                        )
                                    ), 

                                    React.createElement("li", {className: "rcmd-one-book", "data-href": "/ebook/15c0987026fff705cd170a86"}, 
                                        React.createElement("img", {src: "./style/img/9213b07eca8065386b146af391dda144ac348250.jpg"}), 
                                        React.createElement("p", {className: "name"}, "乖，摸摸头"), 
                                        React.createElement("p", {className: "author"}, "作者：大冰"), 
                                        React.createElement("div", {className: "score"}, 
                                            React.createElement("div", {className: "star"}, 
                                                React.createElement("div", {className: "range"}, React.createElement("div", {style: {width: "84%"}}))
                                            ), 
                                            React.createElement("span", null, "7174人阅读")
                                        )
                                    ), 

                                    React.createElement("li", {className: "rcmd-one-book", "data-href": "/ebook/d8c63d8f453610661fd9f483"}, 
                                        React.createElement("img", {src: "./style/img/902397dda144ad3432ef4e67d6a20cf430ad85fa.jpg"}), 
                                        React.createElement("p", {className: "name"}, "从你的全世界路过"), 
                                        React.createElement("p", {className: "author"}, "作者：张嘉佳"), 
                                        React.createElement("div", {className: "score"}, 
                                            React.createElement("div", {className: "star"}, 
                                                React.createElement("div", {className: "range"}, React.createElement("div", {style: {width: "85%"}}))
                                            ), 
                                            React.createElement("span", null, "5438人阅读")
                                        )
                                    ), 

                                    React.createElement("li", {className: "rcmd-one-book", "data-href": "/ebook/caa6e4c0a0116c175f0e48cc"}, 
                                        React.createElement("img", {src: "./style/img/80cb39dbb6fd52662a92e97ba918972bd4073620.jpg"}), 
                                        React.createElement("p", {className: "name"}, "我爱你，时间没什么了不起"), 
                                        React.createElement("p", {className: "author"}, "作者：宋小君等"), 
                                        React.createElement("div", {className: "score"}, 
                                            React.createElement("div", {className: "star"}, 
                                                React.createElement("div", {className: "range"}, React.createElement("div", {style: {width: "87%"}}))
                                            ), 
                                            React.createElement("span", null, "14151人阅读")
                                        )
                                    ), 

                                    React.createElement("li", {className: "rcmd-one-book", "data-href": "/ebook/f8f620b60242a8956aece42f"}, 
                                        React.createElement("img", {src: "./style/img/43a7d933c895d1437a97dfde75f082025baf076d.jpg"}), 
                                        React.createElement("p", {className: "name"}, "魔兽世界·吉安娜：战争之潮"), 
                                        React.createElement("p", {className: "author"}, "作者：克里斯蒂·高登"), 
                                        React.createElement("div", {className: "score"}, 
                                            React.createElement("div", {className: "star"}, 
                                                React.createElement("div", {className: "range"}, React.createElement("div", {style: {width: "100%"}}))
                                            ), 
                                            React.createElement("span", null, "2900人阅读")
                                        )
                                    )
                                )
                            ), 

                            React.createElement("div", {className: "moreInfo"}, 
                                React.createElement("p", {className: "mode_title"}, "更多信息"), 
                                React.createElement("div", null, 
                                    React.createElement("p", null, React.createElement("strong", null, "版权"), " 新星出版社"), 
                                    React.createElement("p", null, React.createElement("strong", null, "出版"), " 新星出版社"), 
                                    React.createElement("p", null, React.createElement("strong", null, "书号"), " 9787513314480"), 
                                    React.createElement("p", null, React.createElement("strong", null, "分类"), " 小说-其他")
                                )
                            )
                        ), 

                        React.createElement("p", {className: "report", style: {display: "block"}}, 
                            React.createElement("a", {target: "_blank", id: "report", href: "http://tieba.baidu.com/p/3961405521"}, "我要反馈")
                        ), 
                        
                            React.createElement(ShareComponent, null)
                        
                )

            );
    }
});
return BookExplainView;
})
