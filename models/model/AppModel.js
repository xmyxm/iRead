/**
 * Created by sqsun on 2015/9/22.
 */
define(["koala"],function(koala){
    var model = {};
    model.onedata = new koala.Model(
        {
            storage: {
                keyname: "onedb",
                init: {
                    defaultData: {name: 'spark', age: 30, add: '上海凌空SOHO'},
                    "lifeTime": "2D",
                    "maxSize": "2M",
                    "engine": sessionStorage
                }
            }
        }
    );

    model.user = new koala.Model(
        {defaultData: {name: 'spark'}}
    );

    model.info = new koala.Model(
        {defaultData: {age: 30, add: '上海凌空SOHO'}}
    );

    //多条数据测试
    var udb = [
        {
            "id": 1,
            "name":"张国立",
            "sex":"男",
            "age": 56,
            "email":"zhangguoli@123.com"
        },
        {
            "id": 2,
            "name":"张铁林",
            "sex":"男",
            "age": 57,
            "email":"zhangtieli@123.com"
        },
        {
            "id": 3,
            "name":"邓婕",
            "sex":"女",
            "age": 53,
            "email":"zhenjie@123.com"
        },
        {
            "id": 4,
            "name":"邓发",
            "sex":"男",
            "age": 40,
            "email":"denfa@123.com"
        }
    ];
    model.userdb  = new koala.Model({
        storage: {
            keyname: "userDB",
            init: {
                defaultData: udb,
                "lifeTime": "5D",
                "maxSize": "2M",
                "engine": localStorage
            }
        },
        ajaxConf: {
            url: "model.json",
            result: "storage",
            showLoading: {show: 1, mask: 0, timeOut: 3}
        }
    });
model.detaildb=new koala.Model({
    storage:{
        keyname: "detailDB",
        init: {
            defaultData: [{id:1,title: '详情资料', content: 'demo测试', mask: '你猜'}
                ,{id:2,title: '我是标题', content: '内容区块', mask: '标记'}
                ,{id:3,title: '标题党', content: '我是内容', mask: '备注'}],
            "lifeTime": "2D",
            "maxSize": "2M",
            "engine": sessionStorage
        }
    }
});

model.bookdb=new koala.Model({
    storage:{
        keyname: "bookDB",
        init: {
            defaultData:[{
                    bookColName:'1.99特价专区',
                    categoryId:'3393',
                    booklist:[
                    {id:1001,
                    src:'./style/img/a50f4bfbfbedab647a830db8f136afc378311ed0.jpg',
                    title:'我们青春都已落幕',
                    content:'我放不下的是那时候的回忆，不是何烨北。我一直坚信，十九岁那年的…',
                    author:'阿Q',
                    rq:'398',
                    price:'24.80',
                    currentPrice:'1.99'},
                    {id:1002,
                    src:'./style/img/e61190ef76c6a7ef2458015afbfaaf51f3de6654.jpg',
                    title:'微光迷失的尘夏',
                    content:'因为一时任性，她间接害死了他的父亲。本该是青梅竹马、两小无猜的…',
                    author:'赤焰冷',
                    rq:'468',
                    price:'18.00',
                    currentPrice:'1.99'},
                    {id:1003,
                    src:'./style/img/aec379310a55b3199f42360a45a98226cffc1711.jpg',
                    title:'杀手正传',
                    content:'麦蒙蒙自从继承她爹的遗志女扮男装世袭了皇城护卫，扔在荷尔蒙过剩…',
                    author:'籽月',
                    rq:'273',
                    price:'24.80',
                    currentPrice:'1.99'}
                    ]
                },
                   {
                    bookColName:'热门推荐',
                    categoryId:'3393',
                    booklist:[
                    {id:1004,
                    src:'./style/img/203fb80e7bec54e7b8f4c25abc389b504fc26a5e.jpg',
                    title:'创业维艰：如何完成比难更…',
                    content:'如何解雇高管？应该从好朋友的公司挖人吗？该不该招资深人士？顺境…',
                    author:'本·霍洛维茨',
                    rq:'54',
                    price:'49.00',
                    currentPrice:'8.99'},
                    {id:1005,
                    src:'./style/img/a8014c086e061d95ce92559e7ef40ad163d9ca44.jpg',
                    title:'支付战争',
                    content:'这是一个野心勃勃的创业计划，在线支付鼻祖PayPal试图创造一…',
                    author:'[美]杰克逊',
                    rq:'29',
                    price:'49.00',
                    currentPrice:'14.99'},
                    {id:1006,
                    src:'./style/img/9f510fb30f2442a74b4798ffd743ad4bd113021a.jpg',
                    title:'超越智商：为什么聪明人也…',
                    content:'在信息爆炸的今天，成为聪明人意味着要阅读大量图书并掌握大量概念…',
                    author:'[加]斯坦诺维奇',
                    rq:'856',
                    price:'59.00',
                    currentPrice:'25.99'}
                    ]
                },
                   {
                    bookColName:'当月图书精选',
                    categoryId:'3393',
                    booklist:[
                    {id:1007,
                    src:'./style/img/d439b6003af33a879761eca0c05c10385343b578.jpg',
                    title:'React中文版',
                    content:'React是Facebook推出的一个用来构建用户界面的Jav…',
                    author:'北京优亿致远无线技术有限公司',
                    rq:'471',
                    price:'58.00',
                    currentPrice:'2.99'},
                    {id:1008,
                    src:'./style/img/9e3df8dcd100baa1a3fe220c4110b912c9fc2eb2.jpg',
                    title:'HTML5中文教程',
                    content:'HTML5是近十年来Web开发标准最巨大的飞跃。HTML5并非…',
                    author:'北京优亿致远无线技术有限公司',
                    rq:'562',
                    price:'22.00',
                    currentPrice:'13.22'},
                    {id:1009,
                    src:'./style/img/3801213fb80e7bec9ffc98e8292eb9389b506b91.jpg',
                    title:'Loadrunner11…',
                    content:'很早就想写一本轻松的书，而出版物一般都内容都会限制的比较死板，…',
                    author:'云层',
                    rq:'822',
                    price:'20.00',
                    currentPrice:'7.88'}
                    ]
                }
                ],
            "lifeTime": "2D",
            "maxSize": "2M",
            "engine": ''
        }
    }
});

    model.userlistdb=new koala.Model({
        storage:{
            keyname: "userlistdb",
            init: {
                defaultData:{
                    userlist:[
                        {to:"123456",type:"group",name:"学车成员交流群",lastMsg:"今天哪里嗨？",lastMsgDate:"11:37",imgsrc:"./style/img/xcqimg.jpg"},
                        {to:"66666",type:"private",name:"张敬烽",lastMsg:"工头喊你来搬砖",lastMsgDate:"15:12",imgsrc:"./style/img/zjficon.jpg"},
                        {to:"654321",type:"private",name:"顾伟",lastMsg:"在么",lastMsgDate:"14:09",imgsrc:"./style/img/guweiicon.jpg"}
                    ],
                    meInfo:{uid:"123123",name:"晨曦沐枫",imgSrc:"./style/img/cxficon.jpg"}
                },
                "lifeTime": "2D",
                "maxSize": "2M",
                "engine": ''
            }
        }
    });

    model.msglistdb = new koala.Model({
        storage:{
            keyname: "msglistdb",
            init: {
                defaultData:[
                    {to:654321
                    ,type:'private'
                    ,imgSrc:'./style/img/guweiicon.jpg'
                    ,name:'顾伟'
                    ,lcaClass:"bubble_default left"
                    ,userClass:"you",
                    contentlist:[
                        {id:'654321',content:'代付款多架飞机',date:''},
                        {id:'123123',content:'从法国法国风格试试',date:''},
                        {id:'654321',content:'问问',date:''},
                        {id:'654321',content:'不牛逼牛逼牛逼',date:''},
                        {id:'123123',content:'尽快尽快尽快',date:''},
                        {id:'123123',content:'喂喂喂',date:''},
                        {id:'654321',content:'气温气温',date:''}
                    ]},
                    {to:66666
                        ,type:'private'
                        ,imgSrc:"./style/img/zjficon.jpg"
                        ,name:'张敬烽'
                        ,lcaClass:"bubble_default left"
                        ,userClass:"you",
                        contentlist:[
                            {id:'123123',content:'cvvkk士大夫似的',date:''},
                            {id:'66666',content:'互相尊重下次回家',date:''},
                            {id:'123123',content:'已UI第已i1',date:''},
                            {id:'123123',content:'那些年才能下半场',date:''},
                            {id:'66666',content:'粉色的',date:''},
                            {id:'66666',content:'vbv2',date:''},
                            {id:'123123',content:'水电费是对方身份',date:''}
                        ]},
                    {to:123456
                        ,type:'private'
                        ,imgSrc:"./style/img/xcqimg.jpg"
                        ,name:'学车成员交流群'
                        ,lcaClass:"bubble_default left"
                        ,userClass:"you",
                        contentlist:[
                            {id:'123123',content:'xnnx似懂非懂都是',date:''},
                            {id:'123123',content:'水电费',date:''},
                            {id:'123456',content:'刚发的鬼地方个',date:''},
                            {id:'123123',content:'的',date:''},
                            {id:'123456',content:'发生的冯绍峰1',date:''},
                            {id:'123123',content:'从vbcb',date:''},
                            {id:'123456',content:'保存vb',date:''}
                        ]}
                ],
                "lifeTime": "2D",
                "maxSize": "2M",
                "engine": ''
            }
        }
    });

    model.currentMsgdb = new koala.Model({
        storage:{
            keyname: "currentMsgdb",
            init: {
                defaultData:{},
                "lifeTime": "2D",
                "maxSize": "2M",
                "engine": ''
            }
        }
    });
    return model;
})