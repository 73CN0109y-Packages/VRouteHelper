"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let RouterInstance = null;
class Router {
    constructor() {
        this._routes = [];
        this._formattedRoutesCache = undefined;
    }
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
    static getFlatRouteMap(routes = null, parentPath = null, flatRouteMap = {}) {
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
    static resolveNamedRoutes(routes) {
        const flatRouteMap = Router.getFlatRouteMap();
        return (routes || Router.routes).map(route => {
            if (route.redirect) {
                route.redirect = flatRouteMap[route.redirect];
            }
            if (route.children && route.children.length > 0) {
                route.children = Router.resolveNamedRoutes(route.children);
            }
            return route;
        });
    }
    static addRoutes(...routes) {
        Router.instance._formattedRoutesCache = undefined;
        routes.forEach(route => {
            if (Array.isArray(route))
                return Router.addRoutes(...route);
            Router.instance._routes.push(route);
        });
    }
}
exports.default = Router;
//# sourceMappingURL=router.js.map