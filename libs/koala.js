define(["underscore", "backbone", "react","socket",'iscroll', "jsx!cAlert", "jsx!cLoading"],function(_, Backbone, React,socket,iscroll, cAlert, cLoading){
    'use strict';
    var koala = {},
        root = window;
    /**
     * @object storageDB
     * @scope private
     * @扩展localstorage与sessionstorage
     * @param {db_name:{string},params:{Object}}
     * @returns Object
     */
    koala.StorageDB = function (db_name, params) {
        var propertys = {
            "prefix": "", //默认前缀
            "defaultData": null,
            "maxSize": "5M",   //默认最大保存数据空间为5M
            "engine": localStorage,
            "lifeTime": "30D",  //默认保存时间为30天 D表示天，H表示小时，M表示分钟，S表示为秒
            "timeOutClear": 1   //超出保存时间自动清除该localstorage
        }
        $.extend(propertys, params);
        var db_id = propertys.prefix + db_name,  //生成数据名称ID
            db = null;
        if($.trim(db_id).length < 1){
            throw new Error('请正确配置数据键值名称！');
        }
        try {
            var storage = (propertys.engine == localStorage ? localStorage : sessionStorage);
            //20160314 xuanfengchen 强制修改数据
            //db = storage[db_id];
            storage.removeItem(db_id);
        } catch (e) {
            return error("当前环境不支持localStorage或sessionStorage!");
        }

        var expire = extimer(); //验证数据是否是已经过期数据
        if (expire) {
            if (!validateName(db_name)) {
                error("Localstorage 键值名称：'" + db_name + "' 为非法字符串！");
            } else {
                var expire = getExpire(propertys.lifeTime);
                db = {"data": propertys.defaultData, "changeData":'', "ajaxData": 0, "timeout": expire, "dataType": ""};
                commit();
            }
        }else{
            db = toJSON(db)
        }

        /**
         * @function getExpire
         * @scope private
         * @转换过期时间成毫秒
         * @param {String}
         * @returns int
         */
        function getExpire(DT) {
            if(typeof DT !== 'string'){
                console.log('%c 当前设置的有效日期格式错误，启用默认值“30D”！', 'color:#ffffff;background-color:red');
                DT = '30D';
            }
            var now = +new Date(),
                timeout = 0,
                dl = DT.length - 1;
            var unit = DT.charAt(dl);
            var num = +DT.substring(0, dl);
            num = parseInt(num) || 1;
            if (typeof unit === 'number') {
                unit = 'D';
                error("设置保存时间格式错误，默认改为以天为单位！");
            } else {
                unit = unit.toUpperCase();
            }

            if (unit == 'D') {  //天
                timeout = num * 24 * 60 * 60;
            } else if (unit == 'H') { //小时
                timeout = num * 60 * 60;
            } else if (unit == 'M') {  //分钟
                timeout = num * 60;
            } else if (unit == 'S') { //秒
                timeout = num;
            } else {
                //默认为天
                timeout = num * 24 * 60 * 60;
            }
            return now + (timeout * 1000);
        }

        /**
         * @function fromJSON
         * @scope private
         * @将JSON对象转成String
         * @param {Object|Array|String} obj Object, Array or String to convert to JSON object
         * @returns {String}
         */
        function fromJSON(obj) {
            var ret;
            try {
                ret = JSON.stringify(obj);
            } catch (e) {
                ret = obj;
            }
            return ret;
        }

        /**
         * @function dataType
         * @scope private
         * @获取存入数据的数据类型
         * @param {Object|Array|String|Iint}
         * @returns {String}
         */
        function getType(data) {
            var isArr  = _.isArray(data);
            if(isArr){
                return "array"
            }else{
                return typeof data
            }
        }

        /**
         * @function toJSON
         * @scope private
         * @将JSON字符串转换成JSON对象
         * @param {String} obj Object to convert to JSON object
         * @returns {Object}
         */
        function toJSON(obj) {
            var ret;
            try {
                ret = JSON.parse(obj);
            } catch (e) {
                ret = obj;
            }
            return ret;
        }

        /**
         * @function getDefaultData
         * @scope private
         * @获取输出相应数据类型的空值
         * @param {String}
         * @returns {Object|Array|String}
         */
        function getDefaultData(type) {
            switch(type){
                case "array":
                    return [];
                    break;
                case "object":
                    return {};
                    break;
                case "string":case "number":
                return "";
                break;
                default:
                    return "";
                    break;
            }
        }

        /**
         * @function quota
         * @scope private
         * @检测最大保存空间
         *  - localStorage: 5MB
         *  - sessionStorage: 5MB
         *  - default: 5MB
         * @param {String} t Type of storage specified
         * @returns {Boolean}
         */
        function quota(data, charset) {
            var total = 0, charCode, i, len;
            var size = parseInt(propertys.maxSize) || 1;
            var max = 1024 * 1024 * size;
            charset = charset ? charset.toLowerCase() : '';
            if(charset === 'utf-16' || charset === 'utf16'){
                for(i = 0, len = data.length; i < len; i++){
                    charCode = data.charCodeAt(i);
                    if(charCode <= 0xffff){
                        total += 2;
                    }else{
                        total += 4;
                    }
                }
            }else{
                for(i = 0, len = data.length; i < len; i++){
                    charCode = data.charCodeAt(i);
                    if(charCode <= 0x007f) {
                        total += 1;
                    }else if(charCode <= 0x07ff){
                        total += 2;
                    }else if(charCode <= 0xffff){
                        total += 3;
                    }else{
                        total += 4;
                    }
                }
            }
            return max - total <= 0;
        }

        /**
         * @function validateName
         * @scope private
         * @验证localstorage KEY名称是否正确
         * @param {String}
         * @returns {Boolean}
         */
        function validateName(name) {
            return name.toString().match(/[^a-z_0-9]/ig) ? false : true;
        }

        /**
         * @function commit
         * @scope private
         * @同步写入stroage操作
         * @returns {Boolean}
         */
        function commit() {
            try {
                var dataType = getType(db.data);
                db.dataType = dataType;
                storage.setItem(db_id, fromJSON(db));
                return true;
            } catch(e) {
                return false;
            }
        }
        /**
         * @function extimer
         * @scope private
         * @验证storage是否过期
         * @returns {Boolean}
         */
        function extimer() {
            var now = +new Date(),
                lifeOut = 0;
            if(db && (db = toJSON(db)) && db.timeout){
                lifeOut = db.timeout
            }
            if(lifeOut - now <= 0){
                return 1
            }else{
                return 0
            }
        }


        /**
         * @function error
         * @scope private
         * @设置错误输出
         * @returns {Error}
         */
        function error(msg) {
            throw new Error(msg);
        }

        return {
            remove: function(callback){
                try {
                    if(db){
                        storage.removeItem(db_id);
                        db = storage = null;
                    }
                    return callback && callback();
                } catch(e) {
                    return callback && callback(e);
                }
            },
            set: function(data, changeData, callback){
                if(!db){
                    error("键值为：“"+db_id+"”的storage对象已经被清除，操作失败！");
                    return false;
                }
                if(quota(fromJSON(data))){
                    error("对不起，您保存的数据已经超出了最大空间 " + propertys.maxSize + ",设置失败！");
                    return false;
                }
                db.data = data;
                if(typeof changeData === 'function'){
                    callback = changeData;
                }else{
                    db.changeData = changeData;
                }

                if(commit()){
                    return callback && callback();
                };
            },
            get: function(params){
                if(extimer()){
                    if(propertys && propertys.timeOutClear){
                        this.clear();
                    }
                    return null;
                }
                if(params && params === 'getchanged'){
                    return toJSON(db.changeData)
                }
                return toJSON(db.data);
            },
            ajaxData: function(param){
                if(typeof param !== 'undefined'){
                    db.ajaxData = param;
                }else{
                    return db.ajaxData;
                }
            },
            clear: function(){
                if(db && db.data){
                    var defaultData = getDefaultData(db.dataType);
                    db.data = defaultData;
                    db.ajaxData = 0;
                    commit();
                }
            }
        }
    };

    /**
     * @object Model
     * @scope private
     * @扩展Backbone的Model属性
     * @param {Object}
     * @returns Object
     */
    koala.Model = function(options){
        var storage = _.result(options, 'storage'),
            BackboneModel = null;
        if(_.isObject(storage)){
            var keyname = storage.keyname || '',
                init = storage.init || {};
            if(!init.hasOwnProperty('defaultData') && options.hasOwnProperty('defaultData')){
                init.defaultData = options.defaultData
            }
            options.storage = new koala.StorageDB(keyname, init);
        }
        BackboneModel = Backbone.Model.extend(options);
        return new BackboneModel();
    }

    /**
     * @object Model
     * @scope private
     * @扩展Backbone的Model属性
     * @param {Object}
     * @returns Object
     */
    koala.ajax = function(url,params, options){
        return Backbone.sync.call(this, url, params, options)
    }

    /*==================================================
     Feature Detection
     ====================================================*/
    koala.support = {
        touch : (window.Modernizr && Modernizr.touch === true) || (function () {
            return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
        })(),
        transforms3d : (window.Modernizr && Modernizr.csstransforms3d === true) || (function () {
            var div = document.createElement('div').style;
            return ('webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div);
        })(),
        flexbox: (function () {
            var div = document.createElement('div').style;
            var styles = ('alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient').split(' ');
            for (var i = 0; i < styles.length; i++) {
                if (styles[i] in div) return true;
            }
        })(),
        observer: (function () {
            return ('MutationObserver' in window || 'WebkitMutationObserver' in window);
        })()
    },

        // Touch events
        koala.touchEvents = {
            start: koala.support.touch ? 'touchstart' : 'mousedown',
            move: koala.support.touch ? 'touchmove' : 'mousemove',
            end: koala.support.touch ? 'touchend' : 'mouseup'
        };

    /**
     * 监听CSS Animation动画结束事件
     * @{param} dom 当前view视图对象
     * @{param} fallback 完成回调
     */
    koala.animationEnd = function (dom, fallback) {
        var events = ['webkitAnimationEnd', 'OAnimationEnd', 'MSAnimationEnd', 'animationend'],
            i;
        var fireCallBack = function(e) {
            if (e.target !== dom[0]) return false;
            fallback(e);
            for (i = 0; i < events.length; i++) {
                dom.off(events[i], fireCallBack);
            }
            return false;
        }
        if (fallback) {
            for (i = 0; i < events.length; i++) {
                dom.on(events[i], fireCallBack);
            }
            return false;
        }
    };

    /**
     * 监听CSS transition动画结束事件
     * @{param} dom 当前view视图对象
     * @{param} fallback 完成回调
     */

    koala.transitionEnd = function (dom, fallback) {
        var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
            i;
        function fireCallBack(e) {
            /*jshint validthis:true */
            if (e.target !== dom[0]) return false;
            fallback(e);
            for (i = 0; i < events.length; i++) {
                dom.off(events[i], fireCallBack);
            }
            return false;
        }
        if (fallback) {
            for (i = 0; i < events.length; i++) {
                dom.on(events[i], fireCallBack);
            }
            return false;
        }
    };

    /**
     * @object cRouter
     * @scope private
     * @扩展Backbone的Router属性
     * @param {Object}
     * @returns Object
     */
    koala.router = koala.Router = Backbone.Router.extend({
        // 实例化时自动调用
        initialize: function() {
            // 保存的视图列表，对应不同页面
            this.views = {};
            this.indexView = null;
            this.swiped = false;

            // 记录控制器变化
            this.currentView = null;
            this.previousView = null;
        },

        /**
         * loading配置
         * 设置视图加载时，是否显示配置的loading
         */
        loading: null,

        /**
         * 路由配置
         * 按照Backbone.Router指定方式配置，例子如下，该部分产品线定义
         */
        routes: {

        },
        /**
         * 配置视图touch返回到上一页事件
         * 根据routes中对应view config 完成相应视图touch事件
         * @function bindViewTouch
         * @scope private
         *
         */
        bindViewTouch: function(){
            var _this = this;
            var onion_ViewMain = $("#koala_mainviews");
            // Touch events
            var isTouched = false,
                isMoved = false,
                curView = null,
                viewTarget = null,
                preView = null,
                previousViewEl = null,
                touchesStart = {},
                touchStartTime,
                touchesDiff = 0,
                swipeEventConfig = {},
                viewContainerWidth;

            // Transforms
            var transform = function (el, transform) {
                for (var i = 0; i < el.length; i++) {
                    var elStyle = el[i].style;
                    elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
                }
                return this;
            };


            //拖动开始
            var handleTouchStart = function (e) {
                curView = _this.currentView;
                if (isTouched || curView.isanimated){
                    return;
                }
                isMoved = false;
                isTouched = true;
                touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
                touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
                touchStartTime = (new Date()).getTime();
                viewTarget = curView && curView.$el;

                //上一个视图
                preView = _this.previousView;
                if(curView == preView){ //如果上一个视图与当前视图相应，则返回到首页视图
                    preView = _this.indexView
                }
                previousViewEl = preView && preView.$el;
                swipeEventConfig = curView && curView.eventConfig;
                if(!swipeEventConfig.swipeBackPage){
                    isTouched = false;
                    return;
                }
            };

            //开始移动
            var handleTouchMove = function (e) {
                if (!isTouched){
                    return;
                }
                //判断鼠标是否移出浏览器(针对PC鼠标移出到浏览器的情况) 20160217 xuanfengchen
               if(!e.target.parentElement){
                   handleTouchEnd();
                }
                var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                // Touches diff
                touchesDiff = (pageX - touchesStart.x - swipeEventConfig.swipeBackPageThreshold);
                if (touchesDiff <= 0){
                    touchesDiff = 0;
                    return
                }
                if (!isMoved) {
                    // Calc values during first move fired
                    viewContainerWidth = onion_ViewMain.width();
                    var notFromBorder = touchesStart.x - onion_ViewMain.offset().left > swipeEventConfig.swipeBackPageActiveArea;
                    if (notFromBorder || previousViewEl === null){
                        isTouched = false;
                        return;
                    }

                    previousViewEl.addClass('actived-viewport'); //显示上一个视图
                    /**
                     * 执行previousView onShow事件
                     */
                    if(_.isFunction(preView.onShow)){
                        preView.onShow({
                            from: curView,
                            to: preView,
                            params: preView.params
                        });
                    }

                    //设置当前视图shadow效果
                    if (swipeEventConfig.swipeBackPageAnimateShadow) {
                        viewTarget.addClass("swipeback-view-shadow");
                    }
                }
                isMoved = true;
                e.preventDefault();

                // Transform pages
                var activePageTranslate = touchesDiff;
                var previousPageTranslate = touchesDiff / 5 - viewContainerWidth / 5;
                transform(viewTarget, 'translate3d(' + activePageTranslate + 'px,0,0)');
                transform(previousViewEl, 'translate3d(' + previousPageTranslate + 'px,0,0)');
                curView.isanimated = true;
            };

            //拖动结束
            var handleTouchEnd = function (e) {
                isTouched = false;
                isMoved = false;

                if (touchesDiff === 0 || !curView.isanimated) {
                    return;
                }

                var timeDiff = (new Date()).getTime() - touchStartTime;

                var pageChanged = false;
                // Swipe back to previous page
                if (
                    timeDiff < 300 && touchesDiff > 10 ||
                    timeDiff >= 300 && touchesDiff > viewContainerWidth / 2
                ) {
                    viewTarget && viewTarget.removeClass('page-on-center').addClass('page-on-right');
                    previousViewEl && previousViewEl.removeClass('page-on-left').addClass('page-on-center');
                    pageChanged = true;
                }

                viewTarget && viewTarget.attr('style','').addClass('page-transitioning');
                previousViewEl && previousViewEl.attr('style','').addClass('page-transitioning');
                touchesDiff = 0;
                koala.transitionEnd(viewTarget, function(){
                    var prevAction = preView.actionUrl;
                    var prevClass = preView.className || '';
                    var curvClass = curView.className || '';
                    curView.isanimated = false;
                    if(pageChanged){
                        _this.navigate(prevAction, 0); //切换URL地址 不自动触发
                        // 切换视图控制器
                        _this.currentView = preView;
                        previousViewEl && previousViewEl.attr("class", prevClass + " actived-viewport");
                        viewTarget && viewTarget.attr("class", curvClass);

                        //触发事件
                        if(_.isFunction(preView.onLoad)){
                            preView.onLoad({
                                from: curView,
                                to: preView,
                                params: preView.params
                            });
                        }
                        curView.Hide({
                            from: preView,
                            to: curView,
                            params: curView.params
                        });
                    }else{
                        previousViewEl && previousViewEl.attr("class", prevClass);
                        viewTarget && viewTarget.attr("class", curvClass + " actived-viewport");
                        preView.Hide({
                            from: curView,
                            to: preView,
                            params: preView.params
                        });
                    }
                });
            }

            //ViewMain Dom绑定touch事件
            if(onion_ViewMain.length > 0 && !_this.swiped){
                _this.swiped = 1;
                onion_ViewMain.on(koala.touchEvents.start, ".koala_viewport", handleTouchStart);
                onion_ViewMain.on(koala.touchEvents.move, ".koala_viewport", handleTouchMove);
                onion_ViewMain.on(koala.touchEvents.end, ".koala_viewport", handleTouchEnd);
            }
        },

        /**
         * 页面切换顺序配置
         * 产品线按以下格式配置，使用action名称
         */
        pageOrder: [/*'index', 'search', 'page'*/],

        /**
         * 页面切换动画配置
         * @key {string} in 为进入下一页面所需动画 back 返回上一页面所需动画
         * @value {string} animation name (css 动画样式name)
         */
        pageTransition: {
            in: ['pt-page-scaleDown','pt-page-moveFromRight pt-page-ontop'],
            back: ['pt-page-scaleDown', 'pt-page-moveFromLeft pt-page-ontop']
        },

        /**
         * action通用处理逻辑
         * @{param} action {string} action名称
         * @{param} params {object} action参数
         * @{param} autoturning {boolean} action是否自动渲染显示
         */
        doAction: function(action, params){
            var _this = this,
                view = _this.views[action];


            /**
             * 通用切换页面逻辑
             * @{param} from {rocket.pageview}
             * @{param} to {rocket.pageview}
             * @{param} params {object}
             * @{param} autoturning {boolean} action是否自动渲染显示
             */
            var switchPage = function(from, to, params){
                var dir = 0, order = _this.pageOrder,
                    fromAction = from && from.action || null,
                    toAction = to && to.action || null,
                    fromIndex, toIndex;

                _this.trigger('routechange', {
                    from: _this.previousView
                    ,to: _this.currentView
                });


                /**
                 * 计算页面切换方向：0-无方向，1-向左，2-向右
                 */
                if(fromAction !== null && null !== toAction && fromAction !== toAction){
                    if(-1 != ( fromIndex = order.indexOf( fromAction ) )
                        && -1 != ( toIndex = order.indexOf( toAction ) ) ){
                        dir = fromIndex > toIndex ? 2 : 1;
                    }
                }

                to && to.Show({
                    from: _this.previousView,
                    to: _this.currentView,
                    direction: dir,
                    inclass: _this.pageTransition.in,
                    backclass: _this.pageTransition.back,
                    params: params
                });

                if(!_this.started){
                    return _this.bindViewTouch();
                }
            };

            //创建视图
            if(!view){
                if(_this.loading){
                    _this.loading.show()
                }
                requirejs([action], function () {
                    if(koala.pageView.hasOwnProperty(action)){
                        view = _this.views[action] = new koala.pageView[action](params, action);
                        view.params = _.extend(view.params, params);

                        if(view.params.isindex){
                            _this.indexView = view
                        }
                        // 切换视图控制器
                        _this.previousView = _this.currentView;
                        _this.currentView = view;
                        switchPage(
                            _this.previousView,
                            _this.currentView,
                            params
                        );
                        if(_this.loading){
                            _this.loading.hide()
                        }
                    }else{
                        console.log('%c 没有找到定义的['+ action +']视图对象！', 'color:#ffffff;background-color:red');
                        return;
                    }
                });
            }else{
                // 切换视图控制器
                _this.previousView = _this.currentView;
                _this.currentView = view;
                switchPage(
                    _this.previousView,
                    _this.currentView,
                    params
                );
            }
        }
        /**
         * 开启History ROUTER 模式
         * @param start
         * @param options
         * @return
         */
        ,start: function(options){
            return Backbone.history.start(options)
        }
        /**
         * 回退页面
         * 如果当前页面不是上一个页面不是同一个页面就做回退动作
         * 如果上一个页面为空，且不是index页面则回退到index页面
         */
        ,goBack: function(){
            var objView = this.previousView;
            var actionUrl ='';
            if(objView){
                actionUrl = objView.actionUrl;
            }
            if(actionUrl && objView!=this.currentView.actionUrl){
                this.navigate(actionUrl);
            }else{
                if(this.currentView.actionUrl != 'index' || actionUrl==''){
                    this.navigate('index');
                }
            }
        }
        /**
         * 开启History navigate 模式
         * @param navigate
         * @param router
         * @return
         */
        ,navigate: function(route,trigger){
            if(this.currentView.isanimated){  //如果有返回动画，则取消切换视图动作
                return
            }
            if(trigger === undefined || trigger == true){
                return Backbone.history.navigate(route, {trigger:true});
            }else{
                return Backbone.history.navigate(route, {trigger:false});
            }
        }
    });


    /**
     * @object baseview
     * @scope private
     * @扩展Backbone的View属性
     * @param {Object}
     * @returns Object
     */
    koala.cBaseview = Backbone.View.extend({
        // 子类入口，子类可重
        onCreate: function(options) {}

        // 初始化函数
        ,initialize: function(options, parentView){
            var _this = this;
            // 初始化选项
            _this.options = options || {__empty: true};
            // 父级view
            _this.parent = parentView || null;

            // 特征字符串，框架默认提供的view标识
            _this.featureString = _this.getFeatureString();

            // 页面方向
            _this.pageOrientation = _this.pageOrientationToBe = Math.abs(root.orientation) || 0;

            // 子类初始化方法
            _this.onCreate(_this.options);
            // 事件注册
            _this._registerEvents();
        }
        /**
         * 获取特征字符串，用于系统内部区分标识view
         */
        ,getFeatureString: function(options){
            var _this = this,
                opt = options || _this.options,
                ft = '';

            /**
             * @note: 使用浅层序列化(shallow serialization)即可，避免
             *   options参数含有非常大的子对象，带来性能消耗，甚至堆栈溢出
             */
            ft = $.param(opt, true);
            options || (_this.featureString = ft);
            return ft;
        }
        /**
         * 方向改变处理函数，子类重写之
         * @param {0|90|-90|180} from 变换前orientation
         * @param {0|90|-90|180} to 变换后orientation
         */
        ,onorientationchange: function(from, to){}

        // 通用事件注册
        ,_registerEvents: function(){
            var _this = this;
            _this._onorientationchange = function(e){
                _this.pageOrientationToBe = Math.abs(root.orientation) || 0;
                /**
                 * @note: 若是活动页，直接响应；非活动页，延迟响应，原因有：
                 * 1. 避免多页面同时响应带来性能损耗
                 * 2. 非活动页处于不可见状态，尺寸属性比如高度等不是期望值，可能导致错误
                 */
                if(_this.isActivePage()){
                    if(_this.pageOrientation != _this.pageOrientationToBe){
                        _this.onorientationchange(
                            _this.pageOrientation
                            ,_this.pageOrientationToBe
                        );
                        _this.pageOrientation = _this.pageOrientationToBe;
                    }
                }

            };

            $(root).on('orientationchange', _this._onorientationchange);
        }

        // pagebeforechange事件通用处理逻辑
        ,Show: function(params){
            var _this = this;
            var fromView = params.from;
            var toView = params.to;
            var fromViewEl = fromView && fromView.$el || null;
            var toViewEl = toView && toView.$el || null;
            var fromViewClass = fromView && fromView.className || '';
            var toViewClass = toView && toView.className || '';
            var aniClass = 'actived-viewport open-gpu ';
            var inClass = params.inclass || '';
            var backClass = params.backclass || '';
            var direction = params.direction || 0;
            //xuanfengchen 20160220 add if 显示已存在的视图必须把参数更新，因为视图同名可能参数不同
            toView.params = params.params;
            params = {
                from: fromView,
                to: toView,
                //params: toView.params  xuanfengchen 20160220 传递参数错误，应该使用当前参数，不应该使用上一个页面参数
                params: toView.params
            }
            // 设备方向通用逻辑，非活动页延迟响应
            if(_this.pageOrientation != _this.pageOrientationToBe){
                _this.onorientationchange(
                    _this.pageOrientation
                    ,_this.pageOrientationToBe
                );
                _this.pageOrientation = _this.pageOrientationToBe;
            }

            /**
             * 执行onShow事件
             */
            if(_.isFunction(_this.onShow)){
                _this.onShow(params);
            }

            /**
             * direction 0-无方向，1-向左，2-向右
             */
            if (direction === 1) {
                fromViewEl && fromViewEl.addClass( aniClass + inClass[0]);
                toViewEl && toViewEl.addClass( aniClass + inClass[1]);
            } else if (direction === 2) { //GO Back
                fromViewEl && fromViewEl.addClass(aniClass + backClass[0]);
                toViewEl && toViewEl.addClass(aniClass + backClass[1]);
            } else{
                toViewEl.addClass('actived-viewport')
            }

            if(fromViewEl && toViewEl){
                toViewEl.isanimated = true;
                koala.animationEnd(toViewEl, function(){
                    toViewEl.isanimated = false;
                    fromViewEl && fromViewEl.attr("class", fromViewClass);
                    fromView.Hide({
                        from: fromView,
                        to: toView,
                        params: fromView.params
                    });
                    toViewEl.attr("class", toViewClass + ' actived-viewport');
                    if(_.isFunction(_this.onLoad)){
                        return _this.onLoad(params);
                    }
                })
            }else{
                if(_.isFunction(_this.onLoad)){
                    return _this.onLoad(params);
                }
            }
        }

        // pageafterchange事件通用处理逻辑
        ,Hide: function(params){
            var _this = this;
            if(_.isFunction(_this.onHide)){
                return _this.onHide(params);
            }
        }

        ,showLoading: function(str){
            var LoadingObj = this.$el.find("#loading-view");
            if(LoadingObj.length >0 ){
                LoadingObj.removeClass("none")
            }else{
                LoadingObj = $('<div id="loading-view"></div>');
                this.$el.append(LoadingObj);
                var c_Loading = React.createFactory(cLoading);
                var c_Loading = c_Loading({text: str || 'Loading..'});
                React.render(c_Loading, LoadingObj[0]);
            }
        }

        ,hideLoading: function(){
            var LoadingObj = this.$el.find("#loading-view");
            LoadingObj.addClass("none");
        }
    });

    /**
     * @object pageView
     * @scope private
     * @实例化Backbone的View属性
     * @param {Object}
     * @returns Object
     */
    koala.pageview = koala.pageView = koala.cBaseview.extend({
        // 初始化函数
        initialize: function(options, action){
            var _this = this;

            // 页面对应action
            if(!action){
                throw Error('pageview creation: must supply non-empty action parameter');
            }
            _this.action = action;
            _this.actionUrl = window.location.href.split('#')[1] || '';

            //设置视图action名称
            _this.$el.data("view_name", action);

            //监听是否正在执行CSS动画
            _this.isanimated = false;

            // 位置保留相关
            _this._tops = {};
            _this._currentLogicString = _this._getLogicString(options);
            _this.trigger('routechange', $.extend({}, _this));
            koala.cBaseview.prototype.initialize.call(_this, options, null);
        }

        ,isActivePage: function(){
            var _this = this;
            return _this.$el.css('display') == 'block';
        }

        ,_getLogicString: function(params){
            // @note: 出于性能考虑，只进行浅层序列化
            return $.param(params || {}, true)
                || '__empty_logic_string__';
        }

        ,savePos: function(){
            var _this = this;

            // @note: chrome pc (mac or win) 浏览器存在读取值不准确的情况
            _this._tops[_this._currentLogicString] = window.scrollY;
        }

        ,restorePos: function(params){
            var _this = this,
                cls = _this._currentLogicString
                    = _this._getLogicString(params);

            // @note: iOS4需要延时
            setTimeout(function(){
                root.scrollTo(0, _this._tops[cls] || 0);
            }, 0);
        }
    });

    /**
     * @object cUi
     * @scope private
     * @实例化koala UI组件
     * @param {Object}
     * @returns Object
     */

    koala.kUI = {
        Alert: function(options){
            var _this = this;
            _this.visible = 0;
            var defaultOpt = {
                'message': '提示信息',
                'buttons': [{
                    text: '确定',
                    click: function () {
                        this.hide();
                    }
                }]
            },modalContainer = null;

            options = _.extend(defaultOpt, options);
            options.buttons.map(function(btn){
                if (!btn.click){
                    btn.click = function(){
                        _this.hide();
                    }
                } else {
                    btn.click = $.proxy(btn.click, _this);
                }
            });
            var c_Alert = React.createFactory(cAlert);
            var c_Alert = c_Alert(options);

            _this.hide = function (){
                if(modalContainer){
                    modalContainer.className = 'none';
                }
            }

            _this.show = function (){
                if(!_this.visible){
                    _this.visible = 1;
                    modalContainer = document.createElement('div');
                    document.body.appendChild(modalContainer);
                    React.render(c_Alert, modalContainer);
                }else{
                    modalContainer.className = '';
                }
            }

            return _this;
        },
        Confirm: function(options){
            var _this = this;
            var confirmAlert = null;
            if(options.hasOwnProperty('callBack') && _.isFunction(options.callBack)){
                options.buttons = [{
                                        text: '取消',
                                        click: function () {
                                            _this.hide();
                                        }
                                    },{
                                        text: '确定',
                                        click: function () {
                                            _this.hide();
                                            return options.callBack();
                                        }
                                    }]
            }else{
                options.buttons = [{
                    text: '取消',
                    click: function () {
                        _this.hide();
                    }
                },{
                    text: '确定',
                    click: function () {
                        _this.hide();
                    }
                }]
            }

            confirmAlert = new koala.kUI.Alert(options);
            _this.show = function(){
                confirmAlert.show();
            }

            _this.hide = function(){
                confirmAlert.hide();
            }

            return _this;
        },
        Toast: function(){
            var _this = this;
            var modalContainer = null;
            var timer = null;
            var _HandlerBack = function(){};
            _this.visible = 0;
            _this.show = function(options){
                var defaultOpt = {
                    Content: "Toast提示",
                    timeOut: 2,
                    clickHide: true
                }, toastOpt = {};

                options = _.extend(defaultOpt, options);
                if(options.clickHide){
                    toastOpt.onClick = function(){
                        this.hide();
                    }
                    toastOpt.onClick = $.proxy(toastOpt.onClick, _this);
                }

                if(options.hasOwnProperty('callBack') && _.isFunction(options.callBack)){
                    _HandlerBack = options.callBack
                }

                toastOpt.message = options.Content;
                var c_Toast = React.createFactory(cAlert);
                var c_Toast = c_Toast(toastOpt);
                if(!_this.visible){
                    _this.visible = 1;
                    modalContainer = document.createElement('div');
                    document.body.appendChild(modalContainer);
                }else{
                    modalContainer.className = '';
                }
                React.render(c_Toast, modalContainer);

                timer = setTimeout(function(){
                    _this.hide();
                }, options.timeOut * 1000);

            }

            _this.hide = function(){
                clearTimeout(timer);
                if(modalContainer){
                    modalContainer.className = 'none';
                }
                return _HandlerBack();
            }

            return _this;
        }
    };
    //页面滑动效果
    koala.iscroll =function(name){
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        var myScroll;
        function objScroll(name){
            myScroll = new IScroll(name, {
                scrollbars: true,
                mouseWheel: true,
                interactiveScrollbars: true,
                shrinkScrollbars: 'scale',
                fadeScrollbars: true
            });
        }
        objScroll(name);
        return objScroll;
    };
    koala.getCookieValue = function(name){
        var strCookie = document.cookie;
        if(name && strCookie.length > 0){
            name += "=";
            var index = document.cookie.indexOf(name);
            var nameindex = index + name.length;
            if(index >= 0){
                var endindex = strCookie.indexOf(";",nameindex);
                if(endindex>=0){
                    return unescape(strCookie.substring(nameindex, endindex));
                }
            }
        }
        return '';
    };
    koala.socketinit = function(isRefresh){
        var user = this.getCookieValue("username");
        var socketObj = socket.connect('http://localhost:4001');
        socketObj.emit('inform',{type:'online',user:user,Refresh:isRefresh});//需要登陆一次
        socketObj.on('ALL', function (msg) {
            console.log(msg);//接受全体广播
        });
/*        socketObj.on(user, function (msg) {
            console.log(msg);//用户登陆后反馈在线人数
        });*/
        koala.sendMsg = function (data){
            data.user = user;
            socketObj.emit('message',data);
        };
        koala.socket = socketObj;
    };
    return koala
})