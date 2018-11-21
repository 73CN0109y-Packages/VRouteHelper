import Vue from 'vue';
import VueRouter from 'vue-router';
import { VRouteHelper, Route } from 'v-route-helper';

Vue.use(VueRouter);

const router = new VueRouter();
const routes = [
    Route('/home', HomePage).name('home'),

    Route(SettingsLayout).group('settings', () => [
        Route('account', SettingsAccountPage)
            .meta('title', 'Account Settings')
            .name('account')
            .group(() => [
                Route('billing', AccountBilling)
                    .meta('title', 'Account Billing')
                    .name('billing'),
            ]),

        Route('notifications', SettingsNotificationPage)
            .meta('title', 'Notifications')
            .name('notifications'),
    ]),
];

Vue.use(VRouteHelper, {
    router,
    routes,
});

const app = new Vue({
    router,
}).$mount('#app');
