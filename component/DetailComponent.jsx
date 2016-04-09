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
                <div>
                        <h3 className="toolBar"><a onClick={this.goBack} className="return">返回</a></h3>
                        <div className="bookInfo">
                            <div className="info">
                                <a href="#">
                                    <img src={explain.src} />
                                </a>
                                <div className="name_author">
                                    <p className="name">{explain.title}</p>
                                    <p className="author">作者：{explain.author}</p>
                                </div>
                                <div className="star">
                                    <div style={{width: "98%"}}></div>
                                </div>
                                <p className="num_size">{explain.rq}人阅读</p>
                                <p className="price">纸书：<del>￥{explain.price}</del></p>
                                <p className="price">
                                    现价：￥{explain.currentPrice}
                                    <span className="discount">0.6折</span>
                                </p>
                            </div>
                            <div className="btns">
                                <button data-href="/view/cbc74dfabe23482fb4da4cba?cooperate=" className="yellow w1">免费试读</button>
                                <span className="blank"></span>
                                <button className="gray w1" data-type="normal" data-docid="cbc74dfabe23482fb4da4cba">购买</button>
                            </div>
                            <div className="fav_apk_share two">
                                <span></span>
                                <a onClick={this.addbookshelf} className="fav">加入书架</a>
                                <span></span>
                                <a className="share" onClick={this.MyShare}>分享</a>
                                <span className="hide"></span>
                            </div>
                        </div>

                        <div className="intro_cat_cmts">
                            <div className="title app" onClick={this.conversion}>
                                <span className={this.state.summary == true ? "on" : ""} data-name="summary">简介</span>
                                <span className={this.state.catalogue == true ? "on" : ""} data-name="catalogue">目录</span>
                                <span className={this.state.comments == true ? "on" : ""} data-name="comments">评论(138)</span>
                            </div>
                            <ul id="intro_cat_cmts">
                                <li className="summary" style={{display:this.state.summary == true ? "block":"none"}}>
                                    <div id="summary-box" style={{height: '180px'}}>
                                        奥格瑞玛的流血结束了。<br /><br />　　联盟和部落共同剥夺了加尔鲁什·地狱咆哮的酋长职位。现在，他已经成为
                                        艾泽拉斯最受唾弃的人物。他的征服欲望毁灭了众多城市，几乎导致部落分裂。无数生命因此而化为乌有……<br /><br />　　现在，在传说中的潘达利亚大陆，他将为自己的罪行而接受审判。全世界的著名
                                        领袖们将聚集一堂，见证这历史性的事件。随着审判开始，青铜龙军团的使者们向世人呈现出加尔鲁什令人惊骇的暴行。对于许多出席审判的人，这些历史的闪回迫使他们重拾自己充满痛苦的回忆，甚至不
                                        得不质疑自己是无辜抑或有罪。对他人而言，这些令人战栗的罪行更是激起了他们憎恨的怒火。
                                    </div>
                                    <p className="more">查看更多</p>
                                </li>
                                <li className="cat" style={{display:this.state.catalogue == true ? "block":"none"}}>
                                    <div id="cat-container" style={{height: "auto"}}>
                                        <p href="#" data-href="1-1" data-level="1" className="orange w1">序</p>
                                        <p href="#" data-href="2-1" data-level="1" className="orange w1">第一章</p>
                                        <p href="#" data-href="3-1" data-level="1" className="orange w1">第二章</p>
                                        <p href="#" data-href="4-1" data-level="1" className="orange w1">第三章</p>
                                        <p href="#" data-href="5-1" data-level="1" className="orange w1">第四章</p>
                                        <p href="#" data-href="6-1" data-level="1" className="orange w1">第五章</p>
                                        <p href="#" data-href="7-1" data-level="1" className="orange w1">第六章</p>
                                        <p href="#" data-href="8-1" data-level="1" className="orange w1">第七章</p>
                                        <p href="#" data-href="9-1" data-level="1" className="orange w1">第八章</p>
                                        <p href="#" data-href="10-1" data-level="1" className="orange w1">第九章</p>
                                        <p href="#" data-href="11-1" data-level="1" className="orange w1">第十章</p>
                                        <p href="#" data-href="12-1" data-level="1" className="orange w1">第十一章</p>
                                        <p href="#" data-href="13-1" data-level="1" className="orange w1">第十二章</p>
                                        <p href="#" data-href="14-1" data-level="1" className="orange w1">第十三章</p>
                                        <p href="#" data-href="15-1" data-level="1" className="orange w1">第十四章</p>
                                        <p href="#" data-href="16-1" data-level="1" className="orange w1">第十五章</p>
                                        <p href="#" data-href="17-1" data-level="1" className="orange w1">第十六章</p>
                                        <p href="#" data-href="18-1" data-level="1" className="orange w1">第十七章</p>
                                        <p href="#" data-href="19-1" data-level="1" className="orange w1">第十八章</p>
                                        <p href="#" data-href="20-1" data-level="1" className="orange w1">第十九章</p>
                                        <p href="#" data-href="21-1" data-level="1" className="orange w1">第二十章</p>
                                        <p href="#" data-href="22-1" data-level="1" className="orange w1">第二十一章</p>
                                        <p href="#" data-href="39-1" data-level="1" className="orange w1">尾声</p>
                                    </div>
                                    <p class="more">查看更多</p>
                                </li>
                                <li className="comments" style={{display:this.state.comments == true ? "block":"none"}}>
                                    <div className="cmts">
                                        <div className="totalcmt">
                                            <strong>综合评分</strong>
                                            <div className="star">
                                                <div className="range"><div style={{width: "98%"}}></div></div>
                                                <span>9.8分</span>
                                            </div>
                                            <em className="cmtNums">（138人评价）</em>
                                        </div>
                                        <div className="douban_zmazon">
                                        </div>

                                        <ul className="cmtslist">

                                            <li>
                                                <p className="cmttitle"></p>
                                                <div className="star">
                                                    <div className="range"><div style={{width: "100%"}}></div></div>
                                                    <span>徐鑫Elisa 2015-11-19</span>
                                                </div>
                                                <div className="cmtContent">经典玩家必看</div>
                                                <p className="cmtMore" style={{display: "none"}}>查看更多</p>
                                            </li>

                                            <li>
                                                <p className="cmttitle">故事引人入胜，讲述了地狱咆哮受审的过程</p>
                                                <div className="star">
                                                    <div className="range"><div style={{width: "100%"}}></div></div>
                                                    <span>翻译质量问题 2015-10-26</span>
                                                </div>
                                                <div className="cmtContent">不过翻译质量来说，没有民间翻译来的精彩。 </div>
                                                <p className="cmtMore" style={{display: "none"}}>查看更多</p>
                                            </li>

                                            <li>
                                                <p className="cmttitle">魔兽世界...</p>
                                                <div className="star">
                                                    <div className="range"><div style={{width: "100%"}}></div></div>
                                                    <span>郑晨炜 2015-10-16</span>
                                                </div>
                                                <div className="cmtContent">很喜欢的一本书·很喜欢魔兽世界陪伴我很多年了·希望它一直好下去 </div>
                                                <p className="cmtMore" style={{display: "none"}}>查看更多</p>
                                            </li>

                                            <li>
                                                <p className="cmttitle">很不错，虽然短了点</p>
                                                <div className="star">
                                                    <div className="range"><div style={{width: "100%"}}></div></div>
                                                    <span>fxr 2015-09-24</span>
                                                </div>
                                                <div className="cmtContent">有点短，不过很精彩，期待更多相关作品 </div>
                                                <p className="cmtMore" style={{display: "none"}}>查看更多</p>
                                            </li>

                                            <li>
                                                <p className="cmttitle">加尔鲁什...</p>
                                                <div className="star">
                                                    <div className="range"><div style={{width: "100%"}}></div></div>
                                                    <span>Damon 2015-08-15</span>
                                                </div>
                                                <div className="cmtContent" style={{height: "96px"}}>
                                                    作为一名魔兽的玩家，对魔兽系列一直很感兴趣，作为一名联盟成员，玩了一个潜行者，野外不停地杀

                                                    部落，这本书写的很真挚，结尾真实出乎意料，估计没人会猜到，加尔鲁什还是得到了宽恕，结尾时，他通过时光之象来到了纳兰格，他昔日的故乡，似乎让他开始反省自己的错误，还是那句话：人是可以

                                                    改变的！
                                                </div>
                                                <p className="cmtMore" style={{display: "block"}}>查看更多</p>
                                            </li>

                                        </ul>
                                        <a href="/ebook/cbc74dfabe23482fb4da4cba?type=comments" className="allCmts">查看所有评论(138)</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        
                        <div id="async">
                            <div className="rmcd">
                                <p className="mode_title">相关推荐</p>
                                <ul>
                                    <li className="rcmd-one-book" data-href="/ebook/4e2c97ec2e3f5727a5e962be">
                                        <img src="./style/img/c8ea15ce36d3d539f33b353e3c87e950342ab0cc.jpg" />
                                        <p className="name">星际争霸Ⅱ：恶魔契约</p>
                                        <p className="author">作者：克里斯蒂·高登</p>
                                        <div className="score">
                                            <div className="star">
                                                <div className="range"><div style={{width: "95%"}}></div></div>
                                            </div>
                                            <span>28人阅读</span>
                                        </div>
                                    </li>

                                    <li className="rcmd-one-book" data-href="/ebook/15c0987026fff705cd170a86">
                                        <img src="./style/img/9213b07eca8065386b146af391dda144ac348250.jpg" />
                                        <p className="name">乖，摸摸头</p>
                                        <p className="author">作者：大冰</p>
                                        <div className="score">
                                            <div className="star">
                                                <div className="range"><div style={{width: "84%"}}></div></div>
                                            </div>
                                            <span>7174人阅读</span>
                                        </div>
                                    </li>

                                    <li className="rcmd-one-book" data-href="/ebook/d8c63d8f453610661fd9f483">
                                        <img src="./style/img/902397dda144ad3432ef4e67d6a20cf430ad85fa.jpg" />
                                        <p className="name">从你的全世界路过</p>
                                        <p className="author">作者：张嘉佳</p>
                                        <div className="score">
                                            <div className="star">
                                                <div className="range"><div style={{width: "85%"}}></div></div>
                                            </div>
                                            <span>5438人阅读</span>
                                        </div>
                                    </li>

                                    <li className="rcmd-one-book" data-href="/ebook/caa6e4c0a0116c175f0e48cc">
                                        <img src="./style/img/80cb39dbb6fd52662a92e97ba918972bd4073620.jpg" />
                                        <p className="name">我爱你，时间没什么了不起</p>
                                        <p className="author">作者：宋小君等</p>
                                        <div className="score">
                                            <div className="star">
                                                <div className="range"><div style={{width: "87%"}}></div></div>
                                            </div>
                                            <span>14151人阅读</span>
                                        </div>
                                    </li>

                                    <li className="rcmd-one-book" data-href="/ebook/f8f620b60242a8956aece42f">
                                        <img src="./style/img/43a7d933c895d1437a97dfde75f082025baf076d.jpg" />
                                        <p className="name">魔兽世界·吉安娜：战争之潮</p>
                                        <p className="author">作者：克里斯蒂·高登</p>
                                        <div className="score">
                                            <div className="star">
                                                <div className="range"><div style={{width: "100%"}}></div></div>
                                            </div>
                                            <span>2900人阅读</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="moreInfo">
                                <p className="mode_title">更多信息</p>
                                <div>
                                    <p><strong>版权</strong> 新星出版社</p>
                                    <p><strong>出版</strong> 新星出版社</p>
                                    <p><strong>书号</strong> 9787513314480</p>
                                    <p><strong>分类</strong> 小说-其他</p>
                                </div>
                            </div>
                        </div>

                        <p className="report" style={{display: "block"}}>
                            <a target="_blank" id="report" href="http://tieba.baidu.com/p/3961405521">我要反馈</a>
                        </p>
                        {
                            <ShareComponent />
                        }
                </div>

            );
    }
});
return BookExplainView;
})
