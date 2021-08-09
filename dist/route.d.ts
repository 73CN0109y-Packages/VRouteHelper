import { RouteComponent, RouteMeta, RouteRecordRaw, RouteRecordRedirectOption } from "vue-router";
export declare type BeforeEnterCallback = (to: any, from: any, next: any) => void;
export declare type vRouteHelperRoute = RouteRecordRaw & {
    _parent: vRouteHelperRoute | undefined;
    children: vRouteHelperRoute[];
    redirect: RouteRecordRedirectOption;
};
export default class Route {
    __path: string;
    __component: RouteComponent;
    __name: string;
    __redirect: string | Route;
    __alias: string;
    __beforeEnter: BeforeEnterCallback;
    __children: any[];
    __meta: RouteMeta;
    __props: any;
    __prefix: string;
    __parent: vRouteHelperRoute | undefined;
    __groupCallback: () => void;
    constructor(_path?: string | RouteComponent, _component?: RouteComponent);
    /**
     * @param {string} name
     * @returns {this}
     */
    name(name: string): this;
    /**
     * @param {string} key
     * @param {any} value
     * @returns {this}
     */
    meta(key: string, value: any): this;
    /**
     * @param {string|object} key
     * @param {any} value
     * @returns {this}
     */
    props(key: string | object, value: any): this;
    /**
     * @param {string | Route} to
     * @returns {this}
     */
    redirect(to: string | Route): this;
    /**
     * @param {string} alias
     * @returns {this}
     */
    alias(alias: string): this;
    /**
     * @param {BeforeEnterCallback} callback
     * @returns {this}
     */
    beforeEnter(callback: BeforeEnterCallback): this;
    /**
     * @param {string | (() => void)} _prefix
     * @param {() => void} _callback
     * @returns {this}
     */
    group(_prefix: string | (() => void), _callback: () => void): this;
    /**
     * Format this into an object vue-router can understand
     * @returns {vRouteHelperRoute}
     */
    format(): vRouteHelperRoute;
    /**
     * @returns {string|undefined}
     */
    get _path(): string | undefined;
    /**
     * @returns {RouteComponent|undefined}
     */
    get _component(): RouteComponent | undefined;
    /**
     * @returns {string | undefined}
     */
    get _name(): string | undefined;
    get _children(): any[];
    /**
     * @returns {RouteMeta}
     */
    get _meta(): RouteMeta;
    /**
     * @returns {object}
     */
    get _props(): object;
    /**
     * @returns {string|undefined}
     */
    get _redirect(): string | undefined;
    /**
     * @returns {string}
     */
    get _alias(): string;
    /**
     * @returns {BeforeEnterCallback}
     */
    get _beforeEnter(): BeforeEnterCallback;
}
