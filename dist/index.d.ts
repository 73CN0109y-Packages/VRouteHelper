import { RouteComponent, Router } from "vue-router";
import { default as _Router } from './router';
import { default as _Route } from './route';
import { App } from 'vue';
declare type PluginOptions = {
    router: Router;
    routes: _Route[];
};
declare const createVRouter: ({ router, routes }: PluginOptions) => {
    VRouteHelper: {
        install(app: App, { router, routes }: PluginOptions): void;
    };
    configuration: {
        router: Router;
        routes: _Route[];
    };
};
declare const Route: (_path?: string | RouteComponent, _component?: RouteComponent) => _Route;
export { createVRouter, _Router, _Route, Route };
