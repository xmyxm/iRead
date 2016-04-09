//     Backbone.js 1.2.1

//     (c) 2010-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function(factory) {

    // Establish the root object, `window` (`self`) in the browser, or `global` on the server.
    // We use `self` instead of `window` for `WebWorker` support.
    var root = (typeof self == 'object' && self.self == self && self) ||
        (typeof global == 'object' && global.global == global && global);

    // Set up Backbone appropriately for the environment. Start with AMD.
    if (typeof define === 'function' && define.amd) {
        define(['underscore', 'exports'], function(_, exports) {
            // Export global even in AMD case in case this script is loaded with
            // others that may still expect a global Backbone.
            root.Backbone = factory(root, exports, _);
        });

        // Next for Node.js or CommonJS. jQuery may not be needed as a module.
    } else if (typeof exports !== 'undefined') {
        var _ = require('underscore');
        factory(root, exports, _);

        // Finally, as a browser global.
    } else {
        root.Backbone = factory(root, {}, root._);
    }

}(function(root, Backbone, _) {

    // Initial Setup
    // -------------

    // Save the previous value of the `Backbone` variable, so that it can be
    // restored later on, if `noConflict` is used.
    var previousBackbone = root.Backbone;

    // Create a local reference to a common array method we'll want to use later.
    var slice = [].slice;

    // Current version of the library. Keep in sync with `package.json`.
    Backbone.VERSION = '1.2.1';

    // For Backbone's purposes, jQuery, Zepto, Ender, or My Library (kidding) owns
    // the `$` variable.
    Backbone.$ = $;

    // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
    // to its previous owner. Returns a reference to this Backbone object.
    Backbone.noConflict = function() {
        root.Backbone = previousBackbone;
        return this;
    };





    // Proxy Underscore methods to a Backbone class' prototype using a
    // particular attribute as the data argument
    var addMethod = function(length, method, attribute) {
        switch (length) {
            case 1: return function() {
                return _[method](this[attribute]);
            };
            case 2: return function(value) {
                return _[method](this[attribute], value);
            };
            case 3: return function(iteratee, context) {
                return _[method](this[attribute], iteratee, context);
            };
            case 4: return function(iteratee, defaultVal, context) {
                return _[method](this[attribute], iteratee, defaultVal, context);
            };
            default: return function() {
                var args = slice.call(arguments);
                args.unshift(this[attribute]);
                return _[method].apply(_, args);
            };
        }
    };
    var addUnderscoreMethods = function(Class, methods, attribute) {
        _.each(methods, function(length, method) {
            if (_[method]) Class.prototype[method] = addMethod(length, method, attribute);
        });
    };







    // Backbone.Events
    // ---------------




    // A module that can be mixed in to *any object* in order to provide it with
    // custom events. You may bind with `on` or remove with `off` callback
    // functions to an event; `trigger`-ing an event fires all callbacks in
    // succession.
    //
    //     var object = {};
    //     _.extend(object, Backbone.Events);
    //     object.on('expand', function(){ alert('expanded'); });
    //     object.trigger('expand');
    //
    var Events = Backbone.Events = {};

    // Regular expression used to split event strings.
    var eventSplitter = /\s+/;

    // Iterates over the standard `event, callback` (as well as the fancy multiple
    // space-separated events `"change blur", callback` and jQuery-style event
    // maps `{event: callback}`), reducing them by manipulating `memo`.
    // Passes a normalized single event name and callback, as well as any
    // optional `opts`.
    var eventsApi = function(iteratee, memo, name, callback, opts) {
        var i = 0, names;
        if (name && typeof name === 'object') {
            // Handle event maps.
            if (callback !== void 0 && 'context' in opts && opts.context === void 0) opts.context = callback;
            for (names = _.keys(name); i < names.length ; i++) {
                memo = iteratee(memo, names[i], name[names[i]], opts);
            }
        } else if (name && eventSplitter.test(name)) {
            // Handle space separated event names.
            for (names = name.split(eventSplitter); i < names.length; i++) {
                memo = iteratee(memo, names[i], callback, opts);
            }
        } else {
            memo = iteratee(memo, name, callback, opts);
        }
        return memo;
    };

    // An internal use `on` function, used to guard the `listening` argument from
    // the public API.
    var internalOn = function(obj, name, callback, context, listening) {
        obj._events = eventsApi(onApi, obj._events || {}, name, callback, {
            context: context,
            ctx: obj,
            listening: listening
        });

        if (listening) {
            var listeners = obj._listeners || (obj._listeners = {});
            listeners[listening.id] = listening;
        }

        return obj;
    };


    // The reducing API that adds a callback to the `events` object.
    var onApi = function(events, name, callback, options) {
        if (callback) {
            var handlers = events[name] || (events[name] = []);
            var context = options.context, ctx = options.ctx, listening = options.listening;
            if (listening) listening.count++;

            handlers.push({ callback: callback, context: context, ctx: context || ctx, listening: listening });
        }
        return events;
    };


    // Handles triggering the appropriate event callbacks.
    var triggerApi = function(objEvents, name, cb, args) {
        if (objEvents) {
            var events = objEvents[name];
            var allEvents = objEvents.all;
            if (events && allEvents) allEvents = allEvents.slice();
            if (events) triggerEvents(events, args);
            if (allEvents) triggerEvents(allEvents, [name].concat(args));
        }
        return objEvents;
    };

    // A difficult-to-believe, but optimized internal dispatch function for
    // triggering events. Tries to keep the usual cases speedy (most internal
    // Backbone events have 3 arguments).
    var triggerEvents = function(events, args) {
        var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
        switch (args.length) {
            case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
            case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
            case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
            case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
            default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args); return;
        }
    };

    // Inversion-of-control versions of `on`. Tell *this* object to listen to
// an event in another object... keeping track of what it's listening to.
    Events.listenTo =  function(obj, name, callback) {
        if (!obj) return this;
        var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
        var listeningTo = this._listeningTo || (this._listeningTo = {});
        var listening = listeningTo[id];

        // This object is not listening to any other events on `obj` yet.
        // Setup the necessary references to track the listening callbacks.
        if (!listening) {
            var thisId = this._listenId || (this._listenId = _.uniqueId('l'));
            listening = listeningTo[id] = {obj: obj, objId: id, id: thisId, listeningTo: listeningTo, count: 0};
        }

        // Bind callbacks on obj, and keep track of them on listening.
        internalOn(obj, name, callback, this, listening);
        return this;
    };
// Bind an event to a `callback` function. Passing `"all"` will bind
// the callback to all events fired.
    Events.on = function(name, callback, context) {
        return internalOn(this, name, callback, context);
    };
    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    Events.stopListening =  function(obj, name, callback) {
        var listeningTo = this._listeningTo;
        if (!listeningTo) return this;

        var ids = obj ? [obj._listenId] : _.keys(listeningTo);

        for (var i = 0; i < ids.length; i++) {
            var listening = listeningTo[ids[i]];

            // If listening doesn't exist, this object is not currently
            // listening to obj. Break out early.
            if (!listening) break;

            listening.obj.off(name, callback, this);
        }
        if (_.isEmpty(listeningTo)) this._listeningTo = void 0;

        return this;
    };
// Trigger one or many events, firing all bound callbacks. Callbacks are
// passed the same arguments as `trigger` is, apart from the event name
// (unless you're listening on `"all"`, which will cause your callback to
// receive the true name of the event as the first argument).
    Events.trigger =  function(name) {
        if (!this._events) return this;

        var length = Math.max(0, arguments.length - 1);
        var args = Array(length);
        for (var i = 0; i < length; i++) args[i] = arguments[i + 1];

        eventsApi(triggerApi, this._events, name, void 0, args);
        return this;
    };

    // Aliases for backwards compatibility.

    Events.bind   = Events.on;



    // Allow the `Backbone` object to serve as a global event bus, for folks who
    // want global "pubsub" in a convenient place.
    _.extend(Backbone, Events);

    // Backbone.Model
    // --------------


    // Backbone **Models** are the basic data object in the framework --
    // frequently representing a row in a table in a database on your server.
    // A discrete chunk of data and a bunch of useful, related methods for
    // performing computations and transformations on that data.

    // Create a new model with the specified attributes. A client id (`cid`)
    // is automatically generated and assigned for you.
    var Model = Backbone.Model = function(attributes, options) {
        options || (options = {});
        var defaultData = this.defaultData;
        this.cid = _.uniqueId(this.cidPrefix);
        this.attributes = null;
        this.changed = null;

        if(this.storage && this.storage.get){
            var storageData = this.storage.get();
            if(storageData){
                this.attributes = storageData;
            }else if(defaultData){
                this.attributes = defaultData;
                this.storage.set && this.storage.set(defaultData);
            }
            this.changed = this.storage.get("getchanged");
        }else{
            if(defaultData){
                this.attributes = this.defaultData;
            }
        }
        this.initialize.apply(this, arguments);
    };

    // Attach all inheritable methods to the Model prototype.
    _.extend(Model.prototype, Events, {






        // The prefix is used to create the client id which is used to identify models locally.
        // You may want to override this if you're experiencing name clashes with model ids.
        cidPrefix: 'cid',


// Clear all attributes on the model, firing `"change"`.
        clear: function(options) {
            this._changing = true;
            this.attributes = null;
            this.trigger('change', this, options);
            this._changing = false;
            if(this.storage && this.storage.clear){
                this.storage.clear();
            }
            return this;
        }
        ,
// Proxy `Backbone.sync` by default -- but override this if you need
// custom syncing semantics for *this* particular model.
        exec: function (param, backoptions) {
            var options = {},
                _this = this,
                ajaxConf = _this.ajaxConf,
                useSync = 0,
                storage = _this.storage || {},
                storageVal = storage.get && storage.get() || null,
                isAjax = storage.ajaxData && storage.ajaxData() || 0;
            if (_.isArray(ajaxConf) && _.isFunction(ajaxConf) && !_.isObject(ajaxConf)) {
                throw new Error('ajaxConf配置参数错误，请修正ajaxConf配置！');
            }
            var url = ajaxConf.url || "",
                type = ajaxConf.type,
                dataType = ajaxConf.dataType,
                cache = ajaxConf.cache,
                timeout = ajaxConf.timeout,
                result = ajaxConf.iscached || 0, //设置是否缓存ajax结果到storage中
                showLoading = ajaxConf.showLoading,
                params = {};
            if (_.isFunction(param)) {
                options.callback = param;
            } else {
                params = _.extend({}, param);
                if(params.hasOwnProperty('_useSync_')){
                    useSync = params._useSync_
                }
            }

            if(_.isFunction(backoptions)){
                options.callback = backoptions
            }else if(_.isObject(backoptions) && !_.isArray(backoptions)){
                _.extend(options, backoptions);
            }

            if(useSync == 0 && result && storageVal != null && isAjax){
                return options.callback.call(_this, storageVal);
            }else{
                if (type) {
                    options.type = type
                }

                if (dataType) {
                    options.dataType = dataType
                }

                if (cache != undefined) {
                    options.cache = cache
                }

                if (timeout) {
                    options.timeout = timeout
                }

                if (showLoading != undefined) {
                    options.showLoading = showLoading
                }

                return Backbone.sync.call(_this, url, params, options);
            }
        },
//
// Get the value of an attribute.
        get:function (attr) {
            var storageDB = this.storage && this.storage.get && this.storage.get();
            var db = null;
            if(storageDB !== undefined){
                db = storageDB
            }else{
                db = this.attributes;
            }

            //设置查询事件
            var query = function (query, limit, sort) {
                var ids = [];
                var ID = null, results = [], row = null;
                if (typeof query === 'object') {
                    ids = queryByValues(query);
                } else if (typeof query === 'function') {
                    ids = queryByFunction(query);
                }

                for (var i = 0, l = ids.length; i < l; i++) {
                    ID = ids[i];
                    row = db[ID];
                    results.push(_.clone(row));
                }

                if (sort && sort instanceof Array) {
                    for (i = 0, l = sort.length; i < l; i++) {
                        results.sort(sort_results(sort[i][0], sort[i].length > 1 ? sort[i][1] : null));
                    }
                }

                if (limit) {
                    var start = 0;
                    if (_.isObject(limit) && !_.isArray(limit)) {
                        start = limit.start || 0;
                        limit = limit.end || results.length;
                    }
                    results = results.slice(start, limit);
                }

                return results
            }
            //键值查询事件
            var queryByValues = function (data) {
                var result_ids = [],
                    exists = false,
                    row = null;
                for (var ID in db) {
                    if (!db.hasOwnProperty(ID)) {
                        continue;
                    }
                    row = db[ID];
                    exists = true;
                    for (var field in data) {
                        if (!data.hasOwnProperty(field)) {
                            continue;
                        }

                        if (typeof data[field] === 'string') {
                            if (row[field] === null || row[field].toString().toLowerCase() != data[field].toString().toLowerCase()) {
                                exists = false;
                                break;
                            }
                        } else {
                            if (row[field] != data[field]) {
                                exists = false;
                                break;
                            }
                        }
                    }
                    if (exists) {
                        result_ids.push(ID);
                    }
                }
                return result_ids;
            }

            //函数条件查询
            var queryByFunction = function (query_function) {
                var result_ids = [],
                    row = null;

                for (var ID in db) {
                    if (!db.hasOwnProperty(ID)) {
                        continue;
                    }
                    row = db[ID];
                    if (query_function(_.clone(row)) == true) {
                        result_ids.push(ID);
                    }
                }
                return result_ids;
            }

            //排序函数
            var sort_results = function (field, order) {
                order = order.toUpperCase();
                return function (x, y) {
                    var v1 = typeof(x[field]) === 'string' ? x[field].toLowerCase() : x[field],
                        v2 = typeof(y[field]) === 'string' ? y[field].toLowerCase() : y[field];

                    if (order === 'DESC') {
                        return v1 == v2 ? 0 : (v1 < v2 ? 1 : -1);
                    } else {
                        return v1 == v2 ? 0 : (v1 > v2 ? 1 : -1);
                    }
                };
            }

            if (db || db === 0 || db === false) {
                if (!attr) { //无任何查询条件
                    return db
                } else if (typeof attr === 'string' || typeof attr === 'number') {
                    attr = attr + '';
                    if (db[attr]) {
                        return db[attr]
                    } else {
                        return null
                    }
                } else { //对像条件查询
                    if (_.isArray(db)) {
                        return query(
                            attr.hasOwnProperty('query') ? attr.query : null,
                            attr.hasOwnProperty('limit') ? attr.limit : null,
                            attr.hasOwnProperty('sort') ? attr.sort : null
                        );
                    } else {
                        console.log('%c 当前Model保存的数据不是Array多条数据，不支持条件查询！', 'color:red');
                        return this.changed;
                    }
                }
            } else {
                return null;
            }
        },


// Determine if the model has changed since the last `"change"` event.
// If you specify an attribute name, determine if that attribute has changed.
        hasChanged: function(attr) {
            if (attr == null) return !_.isEmpty(this.changed);
            return _.has(this.changed, attr);
        },
// Initialize is an empty function by default. Override it with your own
// initialization logic.
        initialize: function(){},



        /**
         * @function _validate
         * @scope private
         * @验证设置的数据类型是否相同
         * @param {String,Json,Array, Num}
         * @returns {String,Json,Array, Num}
         */
        _validate: function(key, val) {
            var _this = this;
            var db = _.clone(_this.attributes);
            var attrs = {};
            if(_.isArray(key)){
                _this.changed = [];
                if(_.isArray(db)){
                    var i = 0, l = key.length, dl = db.length;
                    if(l <= dl && l > 0){
                        for(; i < l; i++){
                            _this.changed[i] = db[i];
                            db[i] = key[i];
                        }
                    }else{
                        _this.changed = db;
                        db  = key
                    }
                    return db;
                }else if(db !== null){
                    _this.changed = db;
                    console.log("%c 初始化数据类型与当前实例数据类型不统一，初始化数据被强行替换！", "color:red");
                }
                return key;
            }else if(typeof key === 'object'){
                if(_.isArray(db) || !_.isObject(db)){
                    _this.changed = db;
                    console.log("%c 初始化数据类型与当前实例数据类型不统一，初始化数据被强行替换！", "color:red");
                }else{
                    key = _.extend(db, key);
                }
                return key;
            }else if(typeof key === 'function'){
                if (_.isArray(db)) {
                    var i = 0, l = db.length, fined = 0;
                    _this.changed = [];
                    for (; i < l; i++) {
                        var c_db = db[i], row = _.clone(c_db), frow = key(row) || {};
                        if(frow.hasOwnProperty("_set_")){
                            var _action = frow._set_['action'] || '',
                                _types = frow._set_['types'],
                                _action = _action.toLowerCase();
                            if(_action === 'delete' || _action === 'del'){
                                _this.changed.push(c_db);
                                db.splice(i,1);
                                l = db.length;
                                i--;
                                fined = 1;
                            }else if(_action === 'add'){
                                var addVal = frow._set_['val'] || null;
                                if(addVal !== null){
                                    _this.changed.push(addVal);
                                    if(_types == 0){
                                        db.push(addVal)
                                    }else{
                                        db.splice(i+1, 0, addVal);
                                        l = db.length;
                                    }
                                    fined = 1;
                                }else{
                                    console.log("%c 添加值不能为空！", "color:red");
                                    break;
                                }
                            }else if(_action === 'update'){
                                var Val = frow._set_['val'] || null;
                                _this.changed.push(_.clone(c_db));
                                db[i] = Val;
                                fined = 1;
                            }

                            if(_types == 0){
                                break
                            }
                        }
                    }
                    if(fined){
                        return db
                    }else{
                        _this.changed = null;
                        return null;
                    }
                } else {
                    console.log('%c 当前Model保存的数据不是Array多条数据，不支持条件设置！', 'color:red');
                    return null;
                }
            }else{
                if(typeof val === 'undefined'){
                    if(typeof db !== typeof key){
                        console.log("%c 初始化数据类型与当前实例数据类型不统一，初始化数据被强行替换！", "color:red");
                    }
                    _this.changed = db;
                    return key;
                }else{
                    key = key + '';
                    attrs[key] = val;
                    if(!_.isObject(db)){
                        _this.changed = db;
                        console.log("%c 初始化数据类型与当前实例数据类型不统一，初始化数据被强行替换！", "color:red");
                    }else{
                        attrs = _.extend(db, attrs);
                    }
                    return attrs;
                }
            }
        },
// Set a hash of model attributes on the object, firing `"change"`. This is
// the core primitive operation of a model, updating the data and notifying
// anyone who needs to know about the change in state. The heart of the beast.
        set: function(key, val, options) {
            if (key == null){
                throw new Error('请正确填写数据！');
            }

            var attrs = this._validate(key, val);
            options || (options = {});

            // Extract attributes and options.
            var silent     = options.silent;
            var changes    = [];
            var prev = _.clone(this.attributes);
            var current = _.clone(this.attributes);
            var changed = {};

            if(_.isObject(attrs)){
                if(_.isArray(attrs)){
                    changes = this.changed || [];
                    current = attrs;
                }else{
                    for (var attr in attrs) {
                        val = attrs[attr];
                        if (!_.isEqual(current[attr], val)) changes.push(attr);
                        if (!_.isEqual(prev[attr], val)) {
                            changed[attr] = prev[attr] || val;
                        }
                        current[attr] = val;
                    }
                    if(_.isObject(this.changed)){
                        this.changed = changed;
                    }

                }
            }else if(attrs !== null){
                changes.push(attrs);
                current = attrs;
            }

            if(attrs !== null){
                this.attributes = attrs;
                if(this.storage && this.storage.set){
                    this.storage.set(attrs, this.changed);
                }

                // Trigger all relevant attribute changes.
                if (!silent) {
                    if (changes.length) this._pending = options;
                    if(current[changes[0]]){
                        for (var i = 0, l = changes.length; i < l; i++) {
                            this.trigger('change:' + changes[i], this, current[changes[i]], options);
                        }
                    }
                    while (this._pending) {
                        options = this._pending;
                        this._pending = false;
                        this.trigger('change', this, options);
                    }
                }
                this._pending = false;
            }
            return this;
        }
    });

    // Underscore methods that we want to implement on the Model.
    var modelMethods = { keys: 1, values: 1, pairs: 1, invert: 1, pick: 0,
        omit: 0, chain: 1, isEmpty: 1 };

    // Mix in each Underscore method as a proxy to `Model#attributes`.
    addUnderscoreMethods(Model, modelMethods, 'attributes');

    // Backbone.Collection
    // -------------------


    // Backbone.View
    // -------------


    // Backbone Views are almost more convention than they are actual code. A View
    // is simply a JavaScript object that represents a logical chunk of UI in the
    // DOM. This might be a single item, an entire list, a sidebar or panel, or
    // even the surrounding frame which wraps your whole app. Defining a chunk of
    // UI as a **View** allows you to define your DOM events declaratively, without
    // having to worry about render order ... and makes it easy for the view to
    // react to specific changes in the state of your models.

    // Creating a Backbone.View creates its initial element outside of the DOM,
    // if an existing element is not provided...
    var View = Backbone.View = function(options) {
        var defaulEventConfig = {
            autoturning : 1, //默认view视图自动显示
            // Swipe Back
            swipeBackPage : true,
            swipeBackPageThreshold : 0,
            swipeBackPageActiveArea : 150,
            swipeBackPageAnimateShadow : true
        };
        this.cid = _.uniqueId('view');
        _.extend(this, _.pick(options, viewOptions));
        this.eventConfig = _.extend(defaulEventConfig, this.eventConfig);
        this.params = _.extend({}, this.params);
        this.className = "koala_viewport " + this.className;
        this._ensureElement();
        this.initialize.apply(this, arguments);
    };

    // Cached regex to split keys for `delegate`.
    var delegateEventSplitter = /^(\S+)\s*(.*)$/;

    // List of view options to be merged as properties.
    var viewOptions = ['model',  'el', 'id', 'attributes', 'className', 'tagName', 'events'];

    // Set up all inheritable **Backbone.View** properties and methods.
    _.extend(View.prototype, Events, {
        // jQuery delegate for element lookup, scoped to DOM elements within the
// current view. This should be preferred to global lookups where possible.
        $: function(selector) {
            return this.$el.find(selector);
        },
// Add a single event listener to the view's element (or a child element
// using `selector`). This only works for delegate-able events: not `focus`,
// `blur`, and not `change`, `submit`, and `reset` in Internet Explorer.
        delegate: function(eventName, selector, listener) {
            this.$el.on(eventName + '.delegateEvents' + this.cid, selector, listener);
            return this;
        },



// Set callbacks, where `this.events` is a hash of
//
// *{"event selector": "callback"}*
//
//     {
//       'mousedown .title':  'edit',
//       'click .button':     'save',
//       'click .open':       function(e) { ... }
//     }
//
// pairs. Callbacks will be bound to the view, with `this` set properly.
// Uses event delegation for efficiency.
// Omitting the selector binds the event to `this.el`.
        delegateEvents: function(events) {
            events || (events = _.result(this, 'events'));
            if (!events) return this;
            this.undelegateEvents();
            for (var key in events) {
                var method = events[key];
                if (!_.isFunction(method)) method = this[method];
                if (!method) continue;
                var match = key.match(delegateEventSplitter);
                this.delegate(match[1], match[2], _.bind(method, this));
            }
            return this;
        },
// Initialize is an empty function by default. Override it with your own
// initialization logic.
        initialize: function(){},

// Produces a DOM element to be assigned to your view. Exposed for
// subclasses using an alternative DOM manipulation API.
        _createElement: function(tagName) {
            var viewParentBox = $("#koala_mainviews");
            if(viewParentBox.length < 1){
                viewParentBox = $('<div id="koala_mainviews" class="koala_mainviews"></div>');
                viewParentBox.prependTo('body');
            }
            var viewPort = document.createElement(tagName),
                viewPortName = "koala_viewport_" + this.cid + new Date().getTime();
            viewPort.setAttribute("id", viewPortName);
            viewPort.className = this.className;
            //viewPort.style.display = "none";
            viewParentBox.append(viewPort);
            this.isCreated = 1;
            return viewPort;
        },
// Ensure that the View has a DOM element to render into.
// If `this.el` is a string, pass it through `$()`, take the first
// matching element, and re-assign it to `el`. Otherwise, create
// an element from the `id`, `className` and `tagName` properties.
        _ensureElement: function() {
            if(!this.isCreated){
                this.setElement(this._createElement(_.result(this, 'tagName')));
            }else{
                this.setElement(this.el);
            }
        },
// **render** is the core function that your view should override, in order
// to populate its element (`this.el`), with the appropriate HTML. The
// convention is for **render** to always return `this`.
        render: function() {
            return this;
        },
// Creates the `this.el` and `this.$el` references for this view using the
// given `el`. `el` can be a CSS selector or an HTML string, a jQuery
// context or an element. Subclasses can override this to utilize an
// alternative DOM manipulation API and are only required to set the
// `this.el` property.
        _setElement: function(el) {
            this.$el = el instanceof Backbone.$ ? el : Backbone.$(el);
            this.el = this.$el[0];
        },
// Change the view's element (`this.el` property) and re-delegate the
// view's events on the new element.
        setElement: function(element) {
            this.undelegateEvents();
            this._setElement(element);
            this.delegateEvents();
            return this;
        },
// The default `tagName` of a View's element is `"div"`.
        tagName: 'div',
// Clears all callbacks previously bound to the view by `delegateEvents`.
// You usually don't need to use this, but may wish to if you have multiple
// Backbone views attached to the same DOM element.
        undelegateEvents: function() {
            if (this.$el) this.$el.off('.delegateEvents' + this.cid);
            return this;
        }


    });

    // Backbone.sync
    // -------------
    // Override this function to change the manner in which Backbone persists
// models to the server. You will be passed the type of request, and the
// model in question. By default, makes a RESTful Ajax request
// to the model's `url()`. Some possible customizations could be:
//
// * Use `setTimeout` to batch rapid-fire updates into a single request.
// * Send up the models as XML instead of JSON.
// * Persist models via WebSockets instead of Ajax.
//
// Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
// as `POST`, with a `_method` parameter containing the true HTTP method,
// as well as all requests with the body as `application/x-www-form-urlencoded`
// instead of `application/json` with the model in a param named `model`.
// Useful when interfacing with server-side languages like **PHP** that make
// it difficult to read the body of `PUT` requests.
    Backbone.sync = function(url,params, options) {
        options = _.extend({}, options);
        var sback = options.sucBack, //ajax返回成功后回调函数
            eback = options.errBack,
            beforeSend = options.beforeSend,
            showLoading = options.showLoading || {},
            hideLoadingCall = options.hideLoadingBack,
            loadingComponent = $("#g_loadingBox_component"),
            _this = this,
            result = _this.ajaxConf && _this.ajaxConf['iscached'] || 0,
            storage = _this.storage || {};
        if(!url){
            throw new Error("AJAX URL参数配置错误！");
            return false;
        }

        //显示loading函数
        var showLoadingFn = function(stat){
            if(_.isObject(showLoading) && !_.isFunction(showLoading) && stat){
                var show = showLoading.show || 0;
                if(show === 1){
                    if(loadingComponent.length > 0){
                        loadingComponent.show()
                    } else {
                        loadingComponent = $('<div id="g_loadingBox_component" class="g_loadingBox_component"></div>');
                        if(showLoading.hasOwnProperty('tpl')){
                            var csTpl = showLoading.tpl;
                            loadingComponent.html(csTpl);
                        } else {
                            loadingComponent.html('<div>Loading</div>');
                        }
                        $('body').append(loadingComponent);
                    }

                    if(showLoading.mask === 1){
                        loadingComponent.addClass('g_show_loading_mask');
                    }else{
                        loadingComponent.removeClass('g_show_loading_mask');
                    }
                }
            }else {
                var showTimeout = showLoading.timeOut || null;
                if(loadingComponent.length > 0){
                    if(showTimeout > 0){
                        setTimeout(function(){
                            loadingComponent.hide();
                            if(_.isFunction(hideLoadingCall)){
                                return hideLoadingCall(loadingComponent);
                            }
                        }, showTimeout * 1000);
                    }else{
                        loadingComponent.hide();
                        if(_.isFunction(hideLoadingCall)){
                            return hideLoadingCall(loadingComponent);
                        }
                    }
                }
            }
        }

        Backbone.$.ajax({
            type: options.type || "get",
            //contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            url: url,
            data: params,
            async:options.async || "true",
            dataType: options.dataType || "json",
            cache: options.cache || true,
            timeout: options.timeout || 3000,
            loading: loadingComponent,
            beforeSend: function(){
                if(_.isFunction(beforeSend)){
                    beforeSend.call(_this);
                }
                return showLoadingFn(1);
            },
            success: function(data){
                showLoadingFn(0);
                if(result){
                    if(storage.get && storage.get()){
                        storage.ajaxData(1);
                        storage.set && storage.set(data);
                    }
                }

                if(_.isFunction(sback)){
                    return sback.call(_this, data)
                }
            },
            error: function(xhr, type, error){
                var errorObj = {
                    obj : xhr,
                    type: type,
                    error: error
                };
                showLoadingFn(0);
                if(_.isFunction(eback)){
                    return eback.call(_this, errorObj)
                }
            }
        });
    };

    // Backbone.Router
    // ---------------

    // Routers map faux-URLs to actions, and fire events when routes are
    // matched. Creating a new one sets its `routes` hash, if not set statically.
    var Router = Backbone.Router = function(options) {
        options || (options = {});
        if (options.routes) this.routes = options.routes;
        this._bindRoutes();
        this.initialize.apply(this, arguments);
    };

    // Cached regular expressions for matching named param parts and splatted
    // parts of route strings.
    var optionalParam = /\((.*?)\)/g;
    var namedParam    = /(\(\?)?:\w+/g;
    var splatParam    = /\*\w+/g;
    var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

    // Set up all inheritable **Backbone.Router** properties and methods.
    _.extend(Router.prototype, Events, {
        // Execute a route handler with the provided parameters.  This is an
// excellent place to do pre-route setup or post-route cleanup.
        execute: function(callback, args) {
            if (callback) callback.apply(this, args);
        },
// Initialize is an empty function by default. Override it with your own
// initialization logic.
        initialize: function(){},
// Simple proxy to `Backbone.history` to save a fragment into the history.
        navigate: function(fragment, options) {
            Backbone.history.navigate(fragment, options);
            return this;
        },





        // Manually bind a single named route to a callback. For example:
        //
        //     this.route('search/:query/p:num', 'search', function(query, num) {
        //       ...
        //     });
        //
        route: function(route, name, callback) {
            if (!_.isRegExp(route)) route = this._routeToRegExp(route);
            if (_.isFunction(name)) {
                callback = name;
                name = '';
            }
            if (!callback) callback = this[name];
            var router = this;
            Backbone.history.route(route, function(fragment) {
                var args = router._extractParameters(route, fragment);
                if (router.execute(callback, args, name) !== false) {
                    router.trigger.apply(router, ['route:' + name].concat(args));
                    router.trigger('route', name, args);
                    Backbone.history.trigger('route', router, name, args);
                }
            });
            return this;
        },
// Convert a route string into a regular expression, suitable for matching
// against the current location hash.
        _routeToRegExp: function(route) {
            route = route.replace(escapeRegExp, '\\$&')
                .replace(optionalParam, '(?:$1)?')
                .replace(namedParam, function(match, optional) {
                    return optional ? match : '([^/?]+)';
                })
                .replace(splatParam, '([^?]*?)');
            return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
        },

// Given a route, and a URL fragment that it matches, return the array of
// extracted decoded parameters. Empty or unmatched parameters will be
// treated as `null` to normalize cross-browser behavior.
        _extractParameters: function(route, fragment) {
            var params = route.exec(fragment).slice(1);
            return _.map(params, function(param, i) {
                // Don't decode the search params.
                if (i === params.length - 1) return param || null;
                return param ? decodeURIComponent(param) : null;
            });
        },


// Bind all defined routes to `Backbone.history`. We have to reverse the
// order of the routes here to support behavior where the most general
// routes can be defined at the bottom of the route map.
        _bindRoutes: function() {
            if (!this.routes) return;
            this.routes = _.result(this, 'routes');
            var route, routes = _.keys(this.routes);
            while ((route = routes.pop()) != null) {
                this.route(route, this.routes[route]);
            }
        }
    });

    // Backbone.History
    // ----------------

    // Handles cross-browser history management, based on either
    // [pushState](http://diveintohtml5.info/history.html) and real URLs, or
    // [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange)
    // and URL fragments. If the browser supports neither (old IE, natch),
    // falls back to polling.
    var History = Backbone.History = function() {
        this.handlers = [];
        _.bindAll(this, 'checkUrl');



        this.location = window.location;
        this.history = window.history;

    };

    // Cached regex for stripping leading and trailing slashes.
    var rootStripper = /^\/+|\/+$/g;

    // Cached regex for stripping urls of hash.
    var pathStripper = /#.*$/;

    // Has the history handling already been started?
    History.started = false;

    // Set up all inheritable **Backbone.History** properties and methods.
    _.extend(History.prototype, Events, {

        // Checks the current URL to see if it has changed, and if it has,
// calls `loadUrl`, normalizing across the hidden iframe.
        checkUrl: function(e) {
            var current = this.getFragment();
            // If the user pressed the back button, the iframe's hash will have
            // changed and we should use that for comparison.
            if (current === this.fragment && this.iframe) {
                current = this.getHash(this.iframe.contentWindow);
            }

            if (current === this.fragment) return false;
            if (this.iframe) this.navigate(current);
            this.loadUrl();
        },
// Unicode characters in `location.pathname` are percent encoded so they're
// decoded for comparison. `%25` should not be decoded since it may be part
// of an encoded parameter.
        decodeFragment: function(fragment) {
            return decodeURI(fragment.replace(/%25/g, '%2525'));
        },
// Get the cross-browser normalized URL fragment from the path or hash.
        getFragment: function(fragment) {
            if (fragment == null) {
                fragment = this.getHash();

                /*        if (this._usePushState || !this._wantsHashChange) {
                 fragment = this.getPath();
                 } else {
                 fragment = this.getHash();
                 }*/
            }
            // Cached regex for stripping a leading hash/slash and trailing space.
            var routeStripper = /^[#\/]|\s+$/g;
            return fragment.replace(routeStripper, '');
        },
// Gets the true hash value. Cannot use location.hash directly due to bug
// in Firefox where location.hash will always be decoded.
        getHash: function(window) {
            var match = (window || this).location.href.match(/#(.*)$/);
            return match ? match[1] : '';
        },

// Attempt to load the current URL fragment. If a route succeeds with a
// match, returns `true`. If no defined routes matches the fragment,
// returns `false`.
        loadUrl: function(fragment) {
            // If the root doesn't match, no routes can match either.
            if (!this.matchRoot()) return false;
            fragment = this.fragment = this.getFragment(fragment);
            return _.any(this.handlers, function(handler) {
                if (handler.route.test(fragment)) {
                    handler.callback(fragment);
                    return true;
                }
            });
        },
// Does the pathname match the root?
        matchRoot: function() {
            var path = this.decodeFragment(this.location.pathname);
            var root = path.slice(0, this.root.length - 1) + '/';
            return root === this.root;
        },
// Update the hash location, either replacing the current entry, or adding
// a new one to the browser history.
        _updateHash: function(location, fragment, replace) {
            if (replace) {
                var href = location.href.replace(/(javascript:|#).*$/, '');
                location.replace(href + '#' + fragment);
            } else {
                // Some browsers require that `hash` contains a leading #.
                location.hash = '#' + fragment;
            }
        },
// Save a fragment into the hash history, or replace the URL state if the
// 'replace' option is passed. You are responsible for properly URL-encoding
// the fragment in advance.
//
// The options object can contain `trigger: true` if you wish to have the
// route callback be fired (not usually desirable), or `replace: true`, if
// you wish to modify the current URL without adding an entry to the history.
        navigate: function(fragment, options) {
            if (!History.started) return false;
            if (!options || options === true) options = {trigger: !!options};

            // Normalize the fragment.
            fragment = this.getFragment(fragment || '');

            // Don't include a trailing slash on the root.
            var root = this.root;
            if (fragment === '' || fragment.charAt(0) === '?') {
                root = root.slice(0, -1) || '/';
            }
            var url = root + fragment;

            // Strip the hash and decode for matching.
            fragment = this.decodeFragment(fragment.replace(pathStripper, ''));

            if (this.fragment === fragment) return;
            this.fragment = fragment;

            // If pushState is available, we use it to set the fragment as a real URL.
            if (this._usePushState) {
                this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

                // If hash changes haven't been explicitly disabled, update the hash
                // fragment to store history.
            } else if (this._wantsHashChange) {
                this._updateHash(this.location, fragment, options.replace);
                if (this.iframe && (fragment !== this.getHash(this.iframe.contentWindow))) {
                    var iWindow = this.iframe.contentWindow;

                    // Opening and closing the iframe tricks IE7 and earlier to push a
                    // history entry on hash-tag change.  When replace is true, we don't
                    // want this.
                    if (!options.replace) {
                        iWindow.document.open();
                        iWindow.document.close();
                    }

                    this._updateHash(iWindow.location, fragment, options.replace);
                }

                // If you've told us that you explicitly don't want fallback hashchange-
                // based history, then `navigate` becomes a page refresh.
            } else {
                return this.location.assign(url);
            }
            if (options.trigger) return this.loadUrl(fragment);
        },
// Add a route to be tested when the fragment changes. Routes added later
// may override previous routes.
        route: function(route, callback) {
            this.handlers.unshift({route: route, callback: callback});
        },
// Start the hash change handling, returning `true` if the current URL matches
// an existing route, and `false` otherwise.
        start: function(options) {
            if (History.started) throw new Error('Backbone.history has already been started');
            History.started = true;

            // Figure out the initial configuration. Do we need an iframe?
            // Is pushState desired ... is it available?
            this.options          = _.extend({root: '/'}, this.options, options);
            this.root             = this.options.root;
            this._wantsHashChange = this.options.hashChange !== false;
            this._hasHashChange   = 'onhashchange' in window;
            this._useHashChange   = this._wantsHashChange && this._hasHashChange;
            this._wantsPushState  = !!this.options.pushState;
            this._hasPushState    = !!(this.history && this.history.pushState);
            this._usePushState    = this._wantsPushState && this._hasPushState;
            this.fragment         = this.getFragment();

            // Normalize root to always include a leading and trailing slash.
            this.root = ('/' + this.root + '/').replace(rootStripper, '/');

            // Transition from hashChange to pushState or vice versa if both are
            // requested.
            if (this._wantsHashChange && this._wantsPushState) {

                // If we've started off with a route from a `pushState`-enabled
                // browser, but we're currently in a browser that doesn't support it...
                if (!this._hasPushState && !this.atRoot()) {
                    var root = this.root.slice(0, -1) || '/';
                    this.location.replace(root + '#' + this.getPath());
                    // Return immediately as browser will do redirect to new url
                    return true;

                    // Or if we've started out with a hash-based route, but we're currently
                    // in a browser where it could be `pushState`-based instead...
                } else if (this._hasPushState && this.atRoot()) {
                    this.navigate(this.getHash(), {replace: true});
                }

            }

            // Proxy an iframe to handle location events if the browser doesn't
            // support the `hashchange` event, HTML5 history, or the user wants
            // `hashChange` but not `pushState`.
            if (!this._hasHashChange && this._wantsHashChange && !this._usePushState) {
                this.iframe = document.createElement('iframe');
                this.iframe.src = 'javascript:0';
                this.iframe.style.display = 'none';
                this.iframe.tabIndex = -1;
                var body = document.body;
                // Using `appendChild` will throw on IE < 9 if the document is not ready.
                var iWindow = body.insertBefore(this.iframe, body.firstChild).contentWindow;
                iWindow.document.open();
                iWindow.document.close();
                iWindow.location.hash = '#' + this.fragment;
            }

            // Add a cross-platform `addEventListener` shim for older browsers.
            var addEventListener = window.addEventListener || function (eventName, listener) {
                    return attachEvent('on' + eventName, listener);
                };

            // Depending on whether we're using pushState or hashes, and whether
            // 'onhashchange' is supported, determine how we check the URL state.
            if (this._usePushState) {
                addEventListener('popstate', this.checkUrl, false);
            } else if (this._useHashChange && !this.iframe) {
                addEventListener('hashchange', this.checkUrl, false);
            } else if (this._wantsHashChange) {
                this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
            }

            if (!this.options.silent) return this.loadUrl();
        }

    });

    // Create the default Backbone.history.
    Backbone.history = new History;

    // Helpers
    // -------

    // Helper function to correctly set up the prototype chain, for subclasses.
    // Similar to `goog.inherits`, but uses a hash of prototype properties and
    // class properties to be extended.
    var extend = function(protoProps, staticProps) {
        var parent = this;
        var child;

        // The constructor function for the new subclass is either defined by you
        // (the "constructor" property in your `extend` definition), or defaulted
        // by us to simply call the parent constructor.
        if (protoProps && _.has(protoProps, 'constructor')) {
            child = protoProps.constructor;
        } else {
            child = function(){ return parent.apply(this, arguments); };
        }

        // Add static properties to the constructor function, if supplied.
        _.extend(child, parent, staticProps);

        // Set the prototype chain to inherit from `parent`, without calling
        // `parent` constructor function.
        var Surrogate = function(){ this.constructor = child; };
        Surrogate.prototype = parent.prototype;
        child.prototype = new Surrogate;

        // Add prototype properties (instance properties) to the subclass,
        // if supplied.
        if (protoProps) _.extend(child.prototype, protoProps);

        // Set a convenience property in case the parent's prototype is needed
        // later.
        child.__super__ = parent.prototype;

        return child;
    };

    // Set up inheritance for the model, collection, router, view and history.

    Model.extend = Router.extend = View.extend = History.extend = extend;

    return Backbone;

}));