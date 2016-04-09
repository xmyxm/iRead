/**
 * Created by sqsun on 2015/9/22.
 */

define(['react', 'koala', 'Model','jsx!RankComponent'],function(React, koala, Model,RankComponent){
    koala.pageView.rankView = koala.pageView.extend({
         tagName:'section'
        ,className:'koala_rank'
        ,onCreate: function(){
            var RankView = React.createFactory(RankComponent);
            RankView=RankView({model:Model.bookdb});
            React.render(RankView,document.getElementsByClassName('koala_rank')[0]);
        },
        onShow: function(params){

        },
        onLoad: function(){
            koala.iscroll('.page_rank');
        },
        onHide: function(){

        }
    });
    return koala.pageView.rankView;
})
