import Route, {vRouteHelperRoute} from "./route";

let RouterInstance: Router = null;

export type FlatRouteMap = {
	[key: string]: vRouteHelperRoute;
	//@ts-ignore
	['unnamed']?: vRouteHelperRoute[];
}

export default class Router {
	public _routes: Route[]                           = [];
	public _formattedRoutesCache: vRouteHelperRoute[] = undefined;

	static get instance() {
		if (!RouterInstance) {
			RouterInstance = new Router();
		}
		return RouterInstance;
	}

	/**
	 * @returns {any}
	 */
	static get routes() {
		if (!Router.instance._formattedRoutesCache) {
			Router.instance._formattedRoutesCache = Router.instance._routes.map(route => route.format());
			Router.resolveNamedRoutes();
		}

		return Router.instance._formattedRoutesCache;
	}

	static getFlatRouteMap(routes = null, parentPath = null, flatRouteMap: FlatRouteMap = {}): FlatRouteMap {
		if (!flatRouteMap.hasOwnProperty('unnamed')) {
			flatRouteMap.unnamed = [];
		}

		(routes || Router.routes).forEach(route => {
			let currentPath = parentPath;

			if (currentPath === null)
				currentPath = route.path;
			else if (currentPath.endsWith('/') || route.path.startsWith('/'))
				currentPath += route.path;
			else
				currentPath += '/' + route.path;

			if (route.name)
				flatRouteMap[route.name] = route;
			else
				flatRouteMap.unnamed.push(route);

			if (route.children && route.children.length > 0) {
				Router.getFlatRouteMap(route.children, currentPath, flatRouteMap);
			}
		});

		return flatRouteMap;
	}

	static resolveNamedRoutes(routes?: undefined | vRouteHelperRoute[]) {
		const flatRouteMap = Router.getFlatRouteMap();

		return (routes || Router.routes).map(route => {
			if (route.redirect) {
				route.redirect = flatRouteMap[route.redirect as string];
			}

			if (route.children && route.children.length > 0) {
				route.children = Router.resolveNamedRoutes(route.children);
			}

			return route;
		});
	}

	public static addRoutes(...routes) {
		Router.instance._formattedRoutesCache = undefined;

		routes.forEach(route => {
			if (Array.isArray(route))
				return Router.addRoutes(...route);

			Router.instance._routes.push(route);
		});
	}
}
