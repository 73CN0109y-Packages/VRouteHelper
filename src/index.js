import _Router from './router';
import _Route from './route';

const VRouteHelper = {
    install(Vue, { router, routes }) {
        _Router.addRoutes(routes.default || routes);

        router.addRoutes(_Router.routes);

        if (process.env.NODE_ENV === 'development') {
            Vue.prototype._vRouteHelper = {
                routes   : _Router.routes,
                rawRoutes: _Router.instance._routes,
                get flatRouteMap() {
                    return _Router.getFlatRouteMap()
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

            let route = _Router.getFlatRouteMap()[ name ];

            /**
             * Resolve the full path from parent routes
             */
            if (key === 'fullpath') {
                let path = route.path;

                while (!!(route = route._parent)) {
                    if (route._path.endsWith('/') || path.startsWith('/'))
                        path = route._path + path;
                    else
                        path = `${route._path}/${path}`;
                }

                return (path.startsWith('/') ? '' : '/') + path;
            }

            return (key !== undefined && key !== null ? route[ key ] : route);
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
            if (typeof values !== 'object') values = [ values ];

            let matches = [];

            for (let route of (routes || _Router.routes)) {
                for (let value of values) {
                    if (typeof value === 'object') {
                        for (let key of Object.keys(value)) {
                            if (route.hasOwnProperty(key) && route[ key ] && route[ key ].indexOf(value[ key ]) > -1) {
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
            return findAllRoutes(value, routes)[ 0 ];
        }

        Vue.prototype.$resolveRouteName = resolveRouteName;
        Vue.prototype.$findAllRoutes    = findAllRoutes;
        Vue.prototype.$findRoute        = findRoute;
    },
};

const Route = (...e) => (new _Route(...e));

export default VRouteHelper;

export {
    VRouteHelper,
    _Router,
    _Route,
    Route,
};
