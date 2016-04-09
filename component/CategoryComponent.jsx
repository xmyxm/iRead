define(["react","jsx!HeaderComponent","jsx!ButtonListComponent","react.backbone"],function(React,Header,ButtonList){
    var CategoryView = React.createBackboneClass({
              render:function(){
                return(
                <div id="wrap">
                    <Header className="123" />
                    <ButtonList />
                    <CgyitemView />
                </div>
                );
            }
    });
    var CgyitemView = React.createBackboneClass({
        render:function(){
            return (
                        <div id="page_container" className="page_cgy">
                            <dl className="bookCat">
                                    <dt>
                                        文学小说
                                    </dt>
                                    <dd>
                                        <li><a data-href="#detail?id=163">现当代小说</a></li>
                                        <li><a data-href="#detail?id=163">言情</a></li>
                                        <li><a data-href="#detail?id=163">悬疑推理</a></li>
                                        <li><a data-href="#detail?id=163">青春</a></li>
                                        <li><a data-href="#detail?id=163">官场商战</a></li>
                                        <li><a data-href="#detail?id=163">社会乡土</a></li>
                                        <li><a data-href="#detail?id=163">历史</a></li>
                                        <li><a data-href="#detail?id=163">武侠魔幻</a></li>
                                        <li><a data-href="#detail?id=163">灵异恐怖</a></li>
                                        <li></li>
                                    </dd>
                                    <dt>
                                        经济管理
                                    </dt>
                                    <dd>
                                        <li><a data-href="#detail?id=163">投资理财</a></li>
                                        <li><a data-href="#detail?id=163">企业管理</a></li>
                                        <li><a data-href="#detail?id=163">经济金融</a></li>
                                        <li><a data-href="#detail?id=163">市场营销</a></li>
                                        <li><a data-href="#detail?id=163">财会统计</a></li>
                                        <li><a data-href="#detail?id=163">通俗读物</a></li>
                                    </dd>

                                    <dt>
                                        成功励志
                                    </dt>
                                    <dd>
                                        <li><a data-href="#detail?id=163">成功学</a></li>
                                        <li><a data-href="#detail?id=163">人在职场</a></li>
                                        <li><a data-href="#detail?id=163">演讲口才</a></li>
                                        <li><a data-href="#detail?id=163">人际处事</a></li>
                                        <li><a data-href="#detail?id=163">心灵修养</a></li>
                                        <li><a data-href="#detail?id=163">性格与情绪</a></li>
                                    </dd>
                                    <dt>
                                        计算机
                                    </dt>
                                    <dd>
                                        <li><a data-href="#detail?id=163">图形与图像</a></li>
                                        <li><a data-href="#detail?id=163">网络与通信</a></li>
                                        <li><a data-href="#detail?id=163">软硬件开发</a></li>
                                        <li><a data-href="#detail?id=163">家庭与办公</a></li>
                                        <li><a data-href="#detail?id=163">IT人文</a></li>
                                        <li><a data-href="#detail?id=163">其他</a></li>
                                    </dd>
                                    <dt>
                                        社会科学
                                    </dt>
                                    <dd>
                                        <li><a data-href="#detail?id=163">社会学</a></li>
                                        <li><a data-href="#detail?id=163">文化</a></li>
                                        <li><a data-href="#detail?id=163">心理学</a></li>
                                        <li><a data-href="#detail?id=163">宗教哲学</a></li>
                                        <li><a data-href="#detail?id=163">时事政治</a></li>
                                        <li><a data-href="#detail?id=163">教育考试</a></li>
                                    </dd>
                                    <dt>
                                        历史传记
                                    </dt>
                                    <dd>
                                        <li><a data-href="#detail?id=163">世界各国史</a></li>
                                        <li><a data-href="#detail?id=163">中国史</a></li>
                                        <li><a data-href="#detail?id=163">普及读物</a></li>
                                        <li><a data-href="#detail?id=163">人物传记</a></li>
                                    </dd>
                                    <dt>
                                        文学艺术
                                    </dt>
                                    <dd>
                                        <li><a data-href="#detail?id=163">散文随笔</a></li>
                                        <li><a data-href="#detail?id=163">纪实文学</a></li>
                                        <li><a data-href="#detail?id=163">世界名著</a></li>
                                        <li><a data-href="#detail?id=163">诗词歌赋</a></li>
                                        <li><a data-href="#detail?id=163">文学理论</a></li>
                                        <li><a data-href="#detail?id=163">其他</a></li>
                                    </dd>
                                    <dt>
                                        生活
                                    </dt>
                                    <dd>
                                        <li><a data-href="#detail?id=163">健康养生</a></li>
                                        <li><a data-href="#detail?id=163">占星风水</a></li>
                                        <li><a data-href="#detail?id=163">烹调饮食</a></li>
                                        <li><a data-href="#detail?id=163">时尚摄影</a></li>
                                        <li><a data-href="#detail?id=163">旅游地理</a></li>
                                        <li><a data-href="#detail?id=163">美容塑身</a></li>
                                    </dd>
                            </dl>
                        </div>
            )}
    });

return CategoryView;
})










