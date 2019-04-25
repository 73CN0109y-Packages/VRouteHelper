/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VRouteHelper", function() { return VRouteHelper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Route", function() { return Route; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__route__ = __webpack_require__(3);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_Router", function() { return __WEBPACK_IMPORTED_MODULE_0__router__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_Route", function() { return __WEBPACK_IMPORTED_MODULE_1__route__["a"]; });
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }




var VRouteHelper = {
    install: function install(Vue, _ref) {
        var router = _ref.router,
            routes = _ref.routes;

        __WEBPACK_IMPORTED_MODULE_0__router__["a" /* default */].addRoutes(routes.default || routes);

        router.addRoutes(__WEBPACK_IMPORTED_MODULE_0__router__["a" /* default */].routes);

        if (true) {
            Vue.prototype._vRouteHelper = {
                routes: __WEBPACK_IMPORTED_MODULE_0__router__["a" /* default */].routes,
                rawRoutes: __WEBPACK_IMPORTED_MODULE_0__router__["a" /* default */].instance._routes,
                get flatRouteMap() {
                    return __WEBPACK_IMPORTED_MODULE_0__router__["a" /* default */].getFlatRouteMap();
                }
            };
        }

        /**
         * Get the path of a named route
         *
         * @param name      The name of the route
         * @param key       Specific key from the route
         * @returns {*}
         */
        function resolveRouteName(name, key) {
            if (name === undefined || name === null) return null;

            var route = __WEBPACK_IMPORTED_MODULE_0__router__["a" /* default */].getFlatRouteMap()[name];

            /**
             * Resolve the full path from parent routes
             */
            if (key === 'fullpath') {
                var path = route.path;

                while (!!(route = route._parent)) {
                    if (route._path.endsWith('/') || path.startsWith('/')) path = route._path + path;else path = route._path + '/' + path;
                }

                return (path.startsWith('/') ? '' : '/') + path;
            }

            return key !== undefined && key !== null ? route[key] : route;
        }

        /**
         * Find all routes that match a criteria
         *
         * @param values
         * @param routes
         * @returns {Array}
         */
        function findAllRoutes(values) {
            var routes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            if (!values) return routes || __WEBPACK_IMPORTED_MODULE_0__router__["a" /* default */].routes;
            if ((typeof values === 'undefined' ? 'undefined' : _typeof(values)) !== 'object') values = [values];

            var matches = [];

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (routes || __WEBPACK_IMPORTED_MODULE_0__router__["a" /* default */].routes)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var route = _step.value;
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = values[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var value = _step2.value;

                            if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
                                var _iteratorNormalCompletion3 = true;
                                var _didIteratorError3 = false;
                                var _iteratorError3 = undefined;

                                try {
                                    for (var _iterator3 = Object.keys(value)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                        var key = _step3.value;

                                        if (route.hasOwnProperty(key) && route[key] && route[key].indexOf(value[key]) > -1) {
                                            matches.push(route);
                                            break;
                                        }
                                    }
                                } catch (err) {
                                    _didIteratorError3 = true;
                                    _iteratorError3 = err;
                                } finally {
                                    try {
                                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                            _iterator3.return();
                                        }
                                    } finally {
                                        if (_didIteratorError3) {
                                            throw _iteratorError3;
                                        }
                                    }
                                }
                            } else {
                                if (route.path && route.path.indexOf(value) > -1 || route.name && route.name.indexOf(value) > -1 || route.alias && route.alias.indexOf(value) > -1 || route.redirect && route.redirect.indexOf(value) > -1) {
                                    matches.push(route);
                                }
                            }
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }

                    if (route.children && route.children.length > 0) {
                        var childMatches = findAllRoutes(values, route.children);

                        matches.push.apply(matches, _toConsumableArray(childMatches));
                    }
                }

                // Remove any duplicates
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return matches.filter(function (x, i) {
                return matches.indexOf(x) === i;
            });
        }

        /**
         * Find the first route that matches a criteria
         *
         * @param value
         * @param routes
         * @returns {*}
         */
        function findRoute(value) {
            var routes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            return findAllRoutes(value, routes)[0];
        }

        Vue.prototype.$resolveRouteName = resolveRouteName;
        Vue.prototype.$findAllRoutes = findAllRoutes;
        Vue.prototype.$findRoute = findRoute;
    }
};

var Route = function Route() {
    for (var _len = arguments.length, e = Array(_len), _key = 0; _key < _len; _key++) {
        e[_key] = arguments[_key];
    }

    return new (Function.prototype.bind.apply(__WEBPACK_IMPORTED_MODULE_1__route__["a" /* default */], [null].concat(e)))();
};

/* harmony default export */ __webpack_exports__["default"] = (VRouteHelper);



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RouterInstance = void 0;

var Router = function () {
    function Router() {
        _classCallCheck(this, Router);

        this._routes = [];
        this._formattedRoutesCache = undefined;
    }

    _createClass(Router, null, [{
        key: 'getFlatRouteMap',
        value: function getFlatRouteMap() {
            var routes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
            var parentPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var flatRouteMap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            if (!flatRouteMap.hasOwnProperty('unnamed')) flatRouteMap.unnamed = [];

            (routes || Router.routes).forEach(function (route) {
                var currentPath = parentPath;

                if (currentPath === null) currentPath = route.path;else if (currentPath.endsWith('/') || route.path.startsWith('/')) currentPath += route.path;else currentPath += '/' + route.path;

                if (route.name) flatRouteMap[route.name] = route;else flatRouteMap.unnamed.push(route);

                if (route.children && route.children.length > 0) Router.getFlatRouteMap(route.children, currentPath, flatRouteMap);
            });

            return flatRouteMap;
        }
    }, {
        key: 'resolveNamedRoutes',
        value: function resolveNamedRoutes(routes) {
            var flatRouteMap = Router.getFlatRouteMap();

            return (routes || Router.routes).map(function (route) {
                if (route.redirect && flatRouteMap.hasOwnProperty(route.redirect)) route.redirect = flatRouteMap[route.redirect];

                if (route.children && route.children.length > 0) route.children = Router.resolveNamedRoutes(route.children);

                return route;
            });
        }
    }, {
        key: 'addRoutes',
        value: function addRoutes() {
            Router.instance._formattedRoutesCache = undefined;

            for (var _len = arguments.length, routes = Array(_len), _key = 0; _key < _len; _key++) {
                routes[_key] = arguments[_key];
            }

            routes.forEach(function (route) {
                if (Array.isArray(route)) return Router.addRoutes.apply(Router, _toConsumableArray(route));

                Router.instance._routes.push(route);
            });
        }
    }, {
        key: 'instance',
        get: function get() {
            if (!RouterInstance) RouterInstance = new Router();
            return RouterInstance;
        }
    }, {
        key: 'routes',
        get: function get() {
            if (!Router.instance._formattedRoutesCache) {
                Router.instance._formattedRoutesCache = Router.instance._routes.map(function (route) {
                    return route.format();
                });
                Router.resolveNamedRoutes();
            }

            return Router.instance._formattedRoutesCache;
        }
    }]);

    return Router;
}();

/* harmony default export */ __webpack_exports__["a"] = (Router);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Route = function () {
    function Route() {
        var _path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        var _component = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        _classCallCheck(this, Route);

        if (typeof _path !== 'string') {
            _component = _path;
            _path = null;
        }

        this.__path = (_path || '').trim();
        this.__component = _component;

        this.__name = undefined;
        this.__redirect = undefined;
        this.__alias = undefined;
        this.__beforeEnter = undefined;
        this.__children = [];
        this.__meta = {};
        this.__props = {};

        this.__prefix = undefined;
        this.__parent = undefined;
        this.__groupCallback = undefined;
    }

    /**
     *
     * @param name
     * @returns {Route}
     */


    _createClass(Route, [{
        key: 'name',
        value: function name(_name) {
            this.__name = _name;

            return this;
        }

        /**
         *
         * @param key
         * @param value
         */

    }, {
        key: 'meta',
        value: function meta(key, value) {
            if (typeof key === 'string') this.__meta[key] = value;else this.__meta = key;

            return this;
        }

        /**
         *
         * @param key
         * @param value
         */

    }, {
        key: 'props',
        value: function props(key, value) {
            if (typeof key === 'string') this.__props[key] = value;else this.__props = key;

            return this;
        }

        /**
         *
         * @param to
         */

    }, {
        key: 'redirect',
        value: function redirect(to) {
            if (!to || typeof to !== 'string' && (typeof to === 'undefined' ? 'undefined' : _typeof(to)) !== 'object' && to.constructor.name !== 'Route') throw 'Redirect must be of type "string" or "Route"';

            this.__redirect = to;

            return this;
        }

        /**
         *
         * @param alias
         * @returns {Route}
         */

    }, {
        key: 'alias',
        value: function alias(_alias) {
            this.__alias = _alias;

            return this;
        }

        /**
         *
         * @param callback
         * @returns {Route}
         */

    }, {
        key: 'beforeEnter',
        value: function beforeEnter(callback) {
            this.__beforeEnter = callback;

            return this;
        }

        /**
         *
         * @param _prefix
         * @param _callback
         * @returns {Route}
         */

    }, {
        key: 'group',
        value: function group(_prefix, _callback) {
            if (typeof _prefix === 'function') {
                _callback = _prefix;
                _prefix = null;
            }

            /**
             * Don't group until we format for vue-router
             * so that way we will have all of our parents
             * properties (prefix, name, etc...) available
             */
            this.__prefix = _prefix;
            this.__groupCallback = _callback;

            return this;
        }

        /**
         * Format this into an object vue-router can understand
         * @returns {{path: *, component: *, name: *, children: *, meta: *, props: *, redirect: *, alias: *, beforeEnter: *}}
         */

    }, {
        key: 'format',
        value: function format() {
            return {
                path: this._path,
                component: this._component,
                name: this._name,
                children: this._children,
                meta: this._meta,
                props: this._props,
                redirect: this._redirect,
                alias: this._alias,
                beforeEnter: this._beforeEnter,
                _parent: this.__parent
            };
        }

        /**
         * Getters
         */

    }, {
        key: '_path',
        get: function get() {
            return this.__path;
        }
    }, {
        key: '_component',
        get: function get() {
            return this.__component;
        }
    }, {
        key: '_name',
        get: function get() {
            return this.__name;
        }
    }, {
        key: '_children',
        get: function get() {
            var _this = this;

            if (this.__groupCallback) {
                this.__children = this.__groupCallback.call(this);
                this.__children.forEach(function (child) {
                    child.__parent = _this;

                    // Prepend the parents name to the child
                    if (_this.__name && child._name) {
                        /*if (this._name.endsWith('.') && child._name.startsWith('.'))
                            child.__name = `${this._name}${child._name.substr(1)}`;*/
                        if (_this._name.endsWith('.') || child._name.startsWith('.')) child.__name = '' + _this._name + child._name;else child.__name = _this._name + '.' + child._name;
                    }

                    // Prepend the group prefix to the child path
                    if (_this.__prefix) {
                        if (_this.__prefix.endsWith('/') || child._path.startsWith('/')) child.__path = '' + _this.__prefix + child._path;else if (child._path) child.__path = _this.__prefix + '/' + child._path;else child.__path = _this.__prefix;
                    }
                });
            }

            return this.__children.map(function (child) {
                return child.format();
            });
        }
    }, {
        key: '_meta',
        get: function get() {
            return this.__meta;
        }
    }, {
        key: '_props',
        get: function get() {
            return this.__props;
        }
    }, {
        key: '_redirect',
        get: function get() {
            return _typeof(this.__redirect) === 'object' && this.__redirect.constructor.name === 'Route' ? this.__redirect._path : this.__redirect;
        }
    }, {
        key: '_alias',
        get: function get() {
            return this.__alias;
        }
    }, {
        key: '_beforeEnter',
        get: function get() {
            return this.__beforeEnter;
        }
    }]);

    return Route;
}();

/* harmony default export */ __webpack_exports__["a"] = (Route);

/***/ })
/******/ ]);