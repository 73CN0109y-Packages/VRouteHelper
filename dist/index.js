"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = exports._Route = exports._Router = exports.createVRouter = void 0;
const tslib_1 = require("tslib");
const router_1 = tslib_1.__importDefault(require("./router"));
Object.defineProperty(exports, "_Router", { enumerable: true, get: function () { return router_1.default; } });
const route_1 = tslib_1.__importDefault(require("./route"));
Object.defineProperty(exports, "_Route", { enumerable: true, get: function () { return route_1.default; } });
const VRouteHelper = {
    install(app, { router, routes }) {
        router_1.default.addRoutes(routes);
        router_1.default.routes.forEach(route => router.addRoute(route));
        if (process.env.NODE_ENV === 'development') {
            app.config.globalProperties._vRouteHelper = {
                routes: router_1.default.routes,
                rawRoutes: router_1.default.instance._routes,
                get flatRouteMap() {
                    return router_1.default.getFlatRouteMap();
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
        function resolveRouteName(name, key) {
            if (name === undefined || name === null)
                return null;
            let routes = router_1.default.getFlatRouteMap()[name];
            let route = null;
            if (Array.isArray(routes)) {
                route = routes[0];
            }
            else {
                route = routes;
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
            if (!values)
                return (routes || router_1.default.routes);
            if (!Array.isArray(values))
                values = [values];
            let matches = [];
            for (let route of (routes || router_1.default.routes)) {
                for (let value of values) {
                    if (typeof value === 'object') {
                        for (let key of Object.keys(value)) {
                            if (route.hasOwnProperty(key) && route[key] && route[key].indexOf(value[key]) > -1) {
                                matches.push(route);
                                break;
                            }
                        }
                    }
                    else {
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
        app.config.globalProperties.$findAllRoutes = findAllRoutes;
        app.config.globalProperties.$findRoute = findRoute;
    },
};
const createVRouter = ({ router, routes }) => {
    return { VRouteHelper, configuration: { router, routes } };
};
exports.createVRouter = createVRouter;
const Route = (_path = null, _component = null) => new route_1.default(_path, _component);
exports.Route = Route;
//# sourceMappingURL=index.js.map