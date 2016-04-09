define(["react",'koala'],function(React,koala){
var HeadExplainView = React.createBackboneClass({
    render:function(){
        return (
                <div className="ydtoolbar" id="yd-header">
                    <div className="baiduBtn btn" data-fun="goBaidu">百度</div>
                    <div className="productBtn btn" data-fun="showProducts"></div>
                    <div className="backBtn btn" data-fun="hideProducts">返回</div>
                    <div className="searchBtn btn" data-fun="search"></div>
                    <div className="naBtn btn" data-fun="native">客户端</div>
                </div>
            );
        }
    });
    return HeadExplainView;
})



