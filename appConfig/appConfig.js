/**
 * Created by sqsun on 2015/9/22.
 */
(function(){
    require.config({
        "baseUrl" : "../",
        "paths"   : {
            /*公共类库*/
            "underscore" : "libs/underscore",
            "backbone"   : "libs/pack",
            "react": "libs/react.min",
            "react.backbone": "libs/react.backbone",
            "JSXTransformer": "libs/JSXTransformer",
            "Backbone": "libs/pack",
            "jsx": "libs/jsx",
            "text": "libs/text",
            "koala": "libs/koala",
            "iscroll":"libs/iscroll-lite",
            "socket":"libs/socket.io-1.4.5",
            /*路由文件*/
            "router": "router/appRouter",
            /*model数据*/
            "Model": "models/model/AppModel",
            /*视图页面*/
            "indexView": "views/index",
            "rankView": "views/rank",
            "freeView":'views/free',
            "categoryView":'views/cgy',
            "addView":"views/add",
            "ucView":"views/uc",
            "detailView":"views/detail",
            "loginView":"views/login",
            "msgView":"views/msg",
            "ulistView":"views/ulist",
            /*组件*/
            "IndexComponent": "component/IndexComponent",
            "BookListAllComponent":"component/BookListAllComponent20160118",
            "BookListComponent":"component/BookListComponent",
            "BookItemComponent":"component/BookItemComponent",
            "ButtonListComponent":"component/ButtonListComponent",
            "FormDataComponent":"component/FormDataComponent20151023",
            "DetailComponent":"component/DetailComponent",
            "ShareComponent":"component/ShareComponent20151123",
            "HeaderComponent":"component/HeaderComponent",
            "RankComponent":"component/RankComponent",
            "CategoryComponent":"component/CategoryComponent",
            "UcComponent":"component/UcComponent",
            "AddComponent":"component/AddComponent",
            "RollbackComponent":"component/RollbackComponent",
            "LoginComponent":"component/LoginComponent",
            "MessageComponent":"component/MessageComponent",
            "MsgTextComponent":"component/MsgTextComponent",
            "UserListComponent":"component/UserListComponent",
            "UserItemComponent":"component/UserItemComponent",
            /*UI组件*/
            "cButton": "ui/c_Button",
            "cOverlay": "ui/c_Overlay",
            "cAlert": "ui/c_Alert",
            "cLoading": "ui/c_Loading"
        },
        jsx: {
            fileExtension: '.jsx',
            harmony: true,
            stripTypes: true
        },
        "shim" : {
            "backbone" : {
                "deps" : [
                    "underscore"
                ],
                "exports" : "Backbone"
            },
            "underscore" : {
                "exports" : "_"
            }
        }
    });

    require(["router"], function(Router) {
        Router.start();
    });
}())