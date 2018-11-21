import Vue from 'vue';
import VueRouter from 'vue-router';
import VRouteHelper from 'v-route-helper';
import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter();

Vue.use(VRouteHelper, {
    router,
    routes,
});

const app = new Vue({
    router,
}).$mount('#app');
