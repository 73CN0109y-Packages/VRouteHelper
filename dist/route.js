"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Route {
    constructor(_path = null, _component = null) {
        this.__path = undefined;
        this.__component = undefined;
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
     * @param {string} name
     * @returns {this}
     */
    name(name) {
        this.__name = name;
        return this;
    }
    /**
     * @param {string} key
     * @param {any} value
     * @returns {this}
     */
    meta(key, value) {
        if (typeof key === 'string')
            this.__meta[key] = value;
        else
            this.__meta = key;
        return this;
    }
    /**
     * @param {string|object} key
     * @param {any} value
     * @returns {this}
     */
    props(key, value) {
        if (typeof key === 'string')
            this.__props[key] = value;
        else
            this.__props = key;
        return this;
    }
    /**
     * @param {string | Route} to
     * @returns {this}
     */
    redirect(to) {
        if (!to || (typeof to !== 'string' && (typeof to !== 'object' && to.constructor.name !== 'Route'))) {
            throw 'Redirect must be of type "string" or "Route"';
        }
        this.__redirect = to;
        return this;
    }
    /**
     * @param {string} alias
     * @returns {this}
     */
    alias(alias) {
        this.__alias = alias;
        return this;
    }
    /**
     * @param {BeforeEnterCallback} callback
     * @returns {this}
     */
    beforeEnter(callback) {
        this.__beforeEnter = callback;
        return this;
    }
    /**
     * @param {string | (() => void)} _prefix
     * @param {() => void} _callback
     * @returns {this}
     */
    group(_prefix, _callback) {
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
     * @returns {vRouteHelperRoute}
     */
    format() {
        return {
            path: this._path,
            component: this._component,
            name: this._name,
            children: this._children,
            meta: this._meta,
            props: this._props,
            redirect: this._redirect,
            alias: [this._alias],
            beforeEnter: this._beforeEnter,
            _parent: this.__parent,
        };
    }
    /**
     * @returns {string|undefined}
     */
    get _path() {
        return this.__path;
    }
    /**
     * @returns {RouteComponent|undefined}
     */
    get _component() {
        return this.__component;
    }
    /**
     * @returns {string | undefined}
     */
    get _name() {
        return this.__name;
    }
    get _children() {
        if (!this.__groupCallback) {
            return this.__children.map(child => child.format());
        }
        this.__children = this.__groupCallback.call(this);
        this.__children.forEach(child => {
            child.__parent = this;
            // Prepend the parents name to the child
            if (this.__name && child._name) {
                /*if (this._name.endsWith('.') && child._name.startsWith('.'))
                 child.__name = `${this._name}${child._name.substr(1)}`;*/
                if (this._name.endsWith('.') || child._name.startsWith('.'))
                    child.__name = `${this._name}${child._name}`;
                else
                    child.__name = `${this._name}.${child._name}`;
            }
            // Prepend the group prefix to the child path
            if (this.__prefix) {
                if (this.__prefix.endsWith('/') || child._path.startsWith('/'))
                    child.__path = `${this.__prefix}${child._path}`;
                else if (child._path)
                    child.__path = `${this.__prefix}/${child._path}`;
                else
                    child.__path = this.__prefix;
            }
        });
        return this.__children.map(child => child.format());
    }
    /**
     * @returns {RouteMeta}
     */
    get _meta() {
        return this.__meta;
    }
    /**
     * @returns {object}
     */
    get _props() {
        return this.__props;
    }
    /**
     * @returns {string|undefined}
     */
    get _redirect() {
        var _a;
        if (typeof this.__redirect === 'string') {
            return this.__redirect;
        }
        return (_a = this === null || this === void 0 ? void 0 : this.__redirect) === null || _a === void 0 ? void 0 : _a.__path;
    }
    /**
     * @returns {string}
     */
    get _alias() {
        return this.__alias;
    }
    /**
     * @returns {BeforeEnterCallback}
     */
    get _beforeEnter() {
        return this.__beforeEnter;
    }
}
exports.default = Route;
//# sourceMappingURL=route.js.map