import Route, { vRouteHelperRoute } from "./route";
export declare type FlatRouteMap = {
    [key: string]: vRouteHelperRoute;
    ['unnamed']?: vRouteHelperRoute[];
};
export default class Router {
    _routes: Route[];
    _formattedRoutesCache: vRouteHelperRoute[];
    static get instance(): Router;
    /**
     * @returns {any}
     */
    static get routes(): vRouteHelperRoute[];
    static getFlatRouteMap(routes?: any, parentPath?: any, flatRouteMap?: FlatRouteMap): FlatRouteMap;
    static resolveNamedRoutes(routes?: undefined | vRouteHelperRoute[]): vRouteHelperRoute[];
    static addRoutes(...routes: any[]): void;
}
