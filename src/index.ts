import {RouteComponent, Router} from "vue-router";
import {default as _Router} from './router';
import {default as _Route, vRouteHelperRoute} from './route';
import { App } from 'vue';

type PluginOptions = {
	router: Router;
	routes: _Route[];
}

const VRouteHelper = {
	install(app:App, {router, routes}: PluginOptions) {

		_Router.addRoutes(routes);

		_Router.routes.forEach(route => router.addRoute(route));

		if (process.env.NODE_ENV === 'development') {
			app.config.globalProperties._vRouteHelper = {
				routes    : _Router.routes,
				rawRoutes : _Router.instance._routes,
				get flatRouteMap() {
					return _Router.getFlatRouteMap();
				},
			};
		}

		/**
		 * Get the path of a named route
		 *
		 * @param name      The name of the route
		 * @param key       Specific key from the route
		 * @returns {*}
		 */
		function resolveRouteName(name: string, key) {
			if (name === undefined || name === null)
				return null;

			let routes                   = _Router.getFlatRouteMap()[name];
			let route: vRouteHelperRoute = null;

			if (Array.isArray(routes)) {
				route = routes[0];
			} else {
				route = routes as vRouteHelperRoute;
			}

			/**
			 * Resolve the full path from parent routes
			 */
			if (key === 'fullpath') {
				let path = route.path;

				while (!!(route = route._parent)) {
					if (route.path.endsWith('/') || path.startsWith('/'))
						path = route.path + path;
					else
						path = `${route.path}/${path}`;
				}

				return (path.startsWith('/') ? '' : '/') + path;
			}

			return (key !== undefined && key !== null ? route[key] : route);
		}

		/**
		 * Find all routes that match a criteria
		 *
		 * @param values
		 * @param routes
		 * @returns {Array}
		 */
		function findAllRoutes(values, routes = null) {
			if (!values) return (routes || _Router.routes);
			if (!Array.isArray(values)) values = [values];

			let matches = [];

			for (let route of (routes || _Router.routes)) {
				for (let value of values) {
					if (typeof value === 'object') {
						for (let key of Object.keys(value)) {
							if (route.hasOwnProperty(key) && route[key] && route[key].indexOf(value[key]) > -1) {
								matches.push(route);
								break;
							}
						}
					} else {
						if ((route.path && route.path.indexOf(value) > -1) ||
							(route.name && route.name.indexOf(value) > -1) ||
							(route.alias && route.alias.indexOf(value) > -1) ||
							(route.redirect && route.redirect.indexOf(value) > -1)) {
							matches.push(route);
						}
					}
				}

				if (route.children && route.children.length > 0) {
					const childMatches = findAllRoutes(values, route.children);

					matches.push(...childMatches);
				}
			}

			// Remove any duplicates
			return matches.filter((x, i) => matches.indexOf(x) === i);
		}

		/**
		 * Find the first route that matches a criteria
		 *
		 * @param value
		 * @param routes
		 * @returns {*}
		 */
		function findRoute(value, routes = null) {
			return findAllRoutes(value, routes)[0];
		}

		app.config.globalProperties.$resolveRouteName = resolveRouteName;
		app.config.globalProperties.$findAllRoutes    = findAllRoutes;
		app.config.globalProperties.$findRoute        = findRoute;
	},
};

const createVRouter = ({router, routes}: PluginOptions) => {
	return {VRouteHelper, configuration : {router, routes}};
};

const Route = (_path: string | RouteComponent = null, _component: RouteComponent = null) => new _Route(_path, _component);

export {
	createVRouter,
	_Router,
	_Route,
	Route
};
