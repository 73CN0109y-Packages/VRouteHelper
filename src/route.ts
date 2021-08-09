import {RouteComponent, RouteMeta, RouteRecordRaw, RouteRecordRedirectOption} from "vue-router";

export type BeforeEnterCallback = (to, from, next) => void;
export type vRouteHelperRoute = RouteRecordRaw & {
	_parent: vRouteHelperRoute | undefined;
	children: vRouteHelperRoute[];
	redirect: RouteRecordRedirectOption;
}

export default class Route {

	public __path: string                     = undefined;
	public __component: RouteComponent        = undefined;
	public __name: string                     = undefined;
	public __redirect: string | Route         = undefined;
	public __alias: string                    = undefined;
	public __beforeEnter: BeforeEnterCallback = undefined;
	public __children: any[]                  = [];
	public __meta: RouteMeta                  = {};
	public __props: any                       = {};
	public __prefix: string                   = undefined;
	public __parent: vRouteHelperRoute | undefined        = undefined;
	public __groupCallback: () => void        = undefined;

	constructor(_path: string | RouteComponent = null, _component: RouteComponent = null) {
		if (typeof _path !== 'string') {
			_component = _path;
			_path      = null;
		}

		this.__path      = (<string>(_path || '')).trim();
		this.__component = _component;

		this.__name        = undefined;
		this.__redirect    = undefined;
		this.__alias       = undefined;
		this.__beforeEnter = undefined;
		this.__children    = [];
		this.__meta        = {};
		this.__props       = {};

		this.__prefix        = undefined;
		this.__parent        = undefined;
		this.__groupCallback = undefined;
	}

	/**
	 * @param {string} name
	 * @returns {this}
	 */
	name(name: string) {
		this.__name = name;

		return this;
	}

	/**
	 * @param {string} key
	 * @param {any} value
	 * @returns {this}
	 */
	meta(key: string, value: any) {
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
	props(key: string | object, value: any) {
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
	redirect(to: string | Route) {
		if (!to || (typeof to !== 'string' && (typeof to !== 'object' && (<Route>to).constructor.name !== 'Route'))) {
			throw 'Redirect must be of type "string" or "Route"';
		}

		this.__redirect = to;

		return this;
	}

	/**
	 * @param {string} alias
	 * @returns {this}
	 */
	alias(alias: string) {
		this.__alias = alias;

		return this;
	}

	/**
	 * @param {BeforeEnterCallback} callback
	 * @returns {this}
	 */
	beforeEnter(callback: BeforeEnterCallback) {
		this.__beforeEnter = callback;

		return this;
	}

	/**
	 * @param {string | (() => void)} _prefix
	 * @param {() => void} _callback
	 * @returns {this}
	 */
	group(_prefix: string | (() => void), _callback: () => void) {
		if (typeof _prefix === 'function') {
			_callback = _prefix;
			_prefix   = null;
		}

		/**
		 * Don't group until we format for vue-router
		 * so that way we will have all of our parents
		 * properties (prefix, name, etc...) available
		 */
		this.__prefix = <string>_prefix;
		this.__groupCallback = _callback;

		return this;
	}

	/**
	 * Format this into an object vue-router can understand
	 * @returns {vRouteHelperRoute}
	 */
	format(): vRouteHelperRoute {
		return {
			path        : this._path,
			component   : this._component,
			name        : this._name,
			children    : this._children,
			meta        : this._meta,
			props       : this._props,
			redirect    : this._redirect,
			alias       : [this._alias],
			beforeEnter : this._beforeEnter,
			_parent     : this.__parent,
		};
	}

	/**
	 * @returns {string|undefined}
	 */
	get _path(): string | undefined {
		return this.__path;
	}

	/**
	 * @returns {RouteComponent|undefined}
	 */
	get _component(): RouteComponent | undefined {
		return this.__component;
	}

	/**
	 * @returns {string | undefined}
	 */
	get _name(): string | undefined {
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
	get _meta(): RouteMeta {
		return this.__meta;
	}

	/**
	 * @returns {object}
	 */
	get _props(): object {
		return this.__props;
	}

	/**
	 * @returns {string|undefined}
	 */
	get _redirect(): string|undefined {
		if (typeof this.__redirect === 'string') {
			return this.__redirect;
		}

		return this?.__redirect?.__path;
	}

	/**
	 * @returns {string}
	 */
	get _alias(): string {
		return this.__alias;
	}

	/**
	 * @returns {BeforeEnterCallback}
	 */
	get _beforeEnter(): BeforeEnterCallback {
		return this.__beforeEnter;
	}
}
