define(["react","jsx!HeaderComponent","jsx!ButtonListComponent","react.backbone"],function(React,Header,ButtonList){
    var CategoryView = React.createBackboneClass({
              render:function(){
                return(
                React.createElement("div", {id: "wrap"}, 
                    React.createElement(Header, {className: "123"}), 
                    React.createElement(ButtonList, null), 
                    React.createElement(CgyitemView, null)
                )
                );
            }
    });
    var CgyitemView = React.createBackboneClass({
        render:function(){
            return (
                        React.createElement("div", {id: "page_container", className: "page_cgy"}, 
                            React.createElement("dl", {className: "bookCat"}, 
                                    React.createElement("dt", null, 
                                        "文学小说"
                                    ), 
                                    React.createElement("dd", null, 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "现当代小说")), 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "言情")), 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "悬疑推理")), 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "青春")), 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "官场商战")), 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "社会乡土")), 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "历史")), 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "武侠魔幻")), 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "灵异恐怖")), 
                                        React.createElement("li", null)
                                    ), 
                                    React.createElement("dt", null, 
                                        "经济管理"
                                    ), 
                                    React.createElement("dd", null, 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "投资理财")), 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "企业管理")), 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "经济金融")), 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "市场营销")), 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "财会统计")), 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "通俗读物"))
                                    ), 

                                    React.createElement("dt", null, 
                                        "成功励志"
                                    ), 
                                    React.createElement("dd", null, 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "成功学")), 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "人在职场")), 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "演讲口才")), 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "人际处事")), 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "心灵修养")), 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "性格与情绪"))
                                    ), 
                                    React.createElement("dt", null, 
                                        "计算机"
                                    ), 
                                    React.createElement("dd", null, 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "图形与图像")), 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "网络与通信")), 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "软硬件开发")), 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "家庭与办公")), 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "IT人文")), 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "其他"))
                                    ), 
                                    React.createElement("dt", null, 
                                        "社会科学"
                                    ), 
                                    React.createElement("dd", null, 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "社会学")), 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "文化")), 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "心理学")), 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "宗教哲学")), 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "时事政治")), 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "教育考试"))
                                    ), 
                                    React.createElement("dt", null, 
                                        "历史传记"
                                    ), 
                                    React.createElement("dd", null, 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "世界各国史")), 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "中国史")), 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "普及读物")), 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "人物传记"))
                                    ), 
                                    React.createElement("dt", null, 
                                        "文学艺术"
                                    ), 
                                    React.createElement("dd", null, 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "散文随笔")), 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "纪实文学")), 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "世界名著")), 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "诗词歌赋")), 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "文学理论")), 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "其他"))
                                    ), 
                                    React.createElement("dt", null, 
                                        "生活"
                                    ), 
                                    React.createElement("dd", null, 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "健康养生")), 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "占星风水")), 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "烹调饮食")), 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "时尚摄影")), 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "旅游地理")), 
                                        React.createElement("li", null, React.createElement("a", {"data-href": "#detail?id=163"}, "美容塑身"))
                                    )
                            )
                        )
            )}
    });

return CategoryView;
})










